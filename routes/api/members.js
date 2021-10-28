const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Gets all members
// Note: here we use router.get instead of app.get, which we used originally
// Note: "/api/members is not needed because it's included in index.js, so we can just use '/'."
router.get("/", (req, res) => res.json(members));

// Get single member
// :id is a URL parameter, and we can use the request object to grab it.
// Note: "/api/members is not needed because it's included in index.js, so we can just use '/'."
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
// Note: need to include a body parser to send the request body. Do this with body parser middleware (see index.js)
router.post("/", (req, res) => {
  // res.send(req.body); // {"name": "Jake Smith", "email": "jake@gmail.com"}

  const newMember = {
    id: uuid.v4(), // generates random universal id
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email." });
  }

  members.push(newMember);

  // return updated array of members
  res.json(members);

  // Redirect to same page
  // res.redirect('/')
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member deleted', 
      members: members.filter((member) => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
