import { withIsland } from "../lib/preact-islands";

function Button() {
  return (
    <button style={{ width: 300, fontSize: 16 }} onClick={() => alert("Interactivity Yeah!!")}>
      <span>Button Island - Click me!</span>
    </button>
  );
}

export default withIsland(Button, 'Button');
