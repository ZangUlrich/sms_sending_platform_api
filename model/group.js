const groupModel = (sequelize, Sequelize) => {
    const group = sequelize.define('group', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        photoUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })

}
