import axios from 'axios';

export const runCode = async (req, res) => {
    try {
        const { code, testCases } = req.body;

        if (!code || !testCases || testCases.length === 0) {
            return res.status(400).json({ error: "Missing code or test cases." });
        }

        const results = [];

        for (let i = 0; i < testCases.length; i++) {
            const tc = testCases[i];

            const sourceCodeB64 = Buffer.from(code).toString('base64');
            const inputB64 = Buffer.from(tc.input).toString('base64');
            const expectedOutputB64 = Buffer.from(tc.output).toString('base64');

            const response = await axios.post(
                'https://ce.judge0.com/submissions?wait=true&fields=*&base64_encoded=true',
                {
                    source_code: sourceCodeB64,
                    language_id: 54,
                    stdin: inputB64,
                    expected_output: expectedOutputB64,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;

            const stdout = data.stdout ? Buffer.from(data.stdout, 'base64').toString('utf-8').trim() : '';
            const compileError = data.compile_output ? Buffer.from(data.compile_output, 'base64').toString('utf-8') : '';
            const stderr = data.stderr ? Buffer.from(data.stderr, 'base64').toString('utf-8') : '';

            if (compileError) {
              return res.status(400).json({
                error: compileError,
              });
            }

            results.push({
                caseNumber: i + 1,
                status: data.status ? data.status.description : "Unknown",
                time: data.time || "0.000",
                memory: data.memory || 0,
                stdout: stdout,
                stderr: stderr || compileError
            });
        }

        return res.json({ results });
    } catch (error) {
        console.error("Execution Engine Detailed Crash Log:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Failed to evaluate code payload completely." });
    }
};