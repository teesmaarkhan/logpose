export const LANGUAGES = {
  cpp: {
    label: "C++",
    monacoId: "cpp",
    ext: "cpp",
    boilerplate: `#include <bits/stdc++.h>
using namespace std;

#define in :
#define len(arr) arr.size()
#define input(val) cin >> val
#define print(val) cout << val
#define println(val) cout << val << endl
#define range(i, s, e) for(int i=s; i<e; i++)
#define revrange(i, s, e) for (int i=e-1; i>=s; i--)

int main(){
\t
\t
\t
    return 0;
}`,
  },
  python: {
    label: "Python 3",
    monacoId: "python",
    ext: "py",
    boilerplate: `import sys
input = sys.stdin.readline

def solve():
    pass

if __name__ == "__main__":
    solve()
`,
  },
  java: {
    label: "Java 17",
    monacoId: "java",
    ext: "java",
    boilerplate: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    }
}
`,
  },
  javascript: {
    label: "Node.js",
    monacoId: "javascript",
    ext: "js",
    boilerplate: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l));
rl.on('close', () => {
  // your code here
});
`,
  },
};
