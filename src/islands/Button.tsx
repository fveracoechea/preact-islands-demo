import { withIsland } from "../lib/PreactIslands";

function Button() {
  return (
    <button className="resource" onClick={() => alert('YEY!!')}>
      <span>Button Island - Click me!</span>
    </button>
  );
}

export default withIsland(Button, 'Button');
