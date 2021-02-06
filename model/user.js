const userModel = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true,
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        emailIsVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        phoneNumberIsVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        smsCredit: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        photoUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
}
