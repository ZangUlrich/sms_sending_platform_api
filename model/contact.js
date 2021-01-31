const contactModel = (sequelize, Sequelize) => {
    const contact = sequelize.define('contact', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        photoUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })
}