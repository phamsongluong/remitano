module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("videos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      fk_user: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING
      }
    });
    return Video;
  };