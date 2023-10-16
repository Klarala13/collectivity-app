const { v4: uuidv4 } = require("uuid");

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    user_id: uuidv4(),
                    first_name: "The",
                    last_name: "Admin",
                    email: "admin@hello.com",
                    password: "12345678",
                    city: "Berlin",
                    zip_code: 10234,
                    registration_date: "2019-05-04",
                    rating: 5,
                    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("users", null, {});
    },
};
