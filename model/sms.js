const smsModel = (sequelize, Sequelize) => {
    const sms = sequelize.define('Sms', {
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sendDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        smsIsSend: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    })
}
