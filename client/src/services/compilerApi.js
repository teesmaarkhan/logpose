const API_URL = `${import.meta.env.VITE_API_URL}/api`;
async function handleResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export async function fetchTestCases(url) {
  const res = await fetch(`${API_URL}/fetch-tc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  return handleResponse(res);
}

export async function executeCode(code, testCases, language) {
  const res = await fetch(`${API_URL}/run-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      testCases,
      language,
    }),
  });

  return handleResponse(res);
}

export async function executeSingleCase(code, testCase, language) {
  const res = await fetch(`${API_URL}/run-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      language,
      testCases: [testCase],
    }),
  });

  return handleResponse(res);
}

export async function executeScratch(code, input, language) {
  const res = await fetch(`${API_URL}/run-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      language,
      testCases: [
        {
          input,
          output: "",
        },
      ],
    }),
  });

  return handleResponse(res);
}
