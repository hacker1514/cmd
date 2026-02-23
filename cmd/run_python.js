let pyodideReadyPromise = loadPyodide();

async function run_python(code) {
  let pyodide = await pyodideReadyPromise;

  try {
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

    await pyodide.runPythonAsync(code);

    let stdout = pyodide.runPython("sys.stdout.getvalue()");
    let stderr = pyodide.runPython("sys.stderr.getvalue()");

    if (stderr) {
      output(stderr.trim(), "red");
    } else {
      output(stdout.trim(), "#FFB000");
    }

  } catch (err) {
    output(err.toString(), "red");
  }
}