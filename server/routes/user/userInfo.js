const User = require("../../models/User");

module.exports = router => {
  router.get("/:id/images", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json(user);
  });

  router.get("/:userName", async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({ name: userName });

    if (!user) return res.status(404).json({ error: "Not found" });

    const { content, name, avatar, status, images } = user;
    const data = {
      name,
      avatar,
      content,
      status,
      images
    };

    res.json(data);
  });
};
