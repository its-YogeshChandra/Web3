const crypto = require("node:crypto");

const hashfinder = () => {
  let found = false;
  let input = 0;
  while (found == false) {

    const val = crypto
      .createHash("sha256")
      .update(input.toString())
      .digest("hex");
      console.log(val)
    if (val.startsWith("00000")) {
      console.log(val);
      found = true;
    } else {
      input++;
    }
  }
};

hashfinder();
