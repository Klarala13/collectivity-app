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
                    email: "admin@hillo.com",
                    password: "12345678",
                    city: "Berlin",
                    zip_code: 10234,
                    registration_date: "2019-05-04",
                    rating: 5,
                    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                },
                {
                    user_id: uuidv4(),
                    first_name: "Klara",
                    last_name: "13",
                    email: "klara@hillo.com",
                    password: "12345678",
                    city: "Barcelona",
                    zip_code: 10234,
                    registration_date: "2019-05-04",
                    rating: 4.5,
                    image: "https://images.app.goo.gl/L2b9yQCNNpFK7wxJA",
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("users", null, {});
    },
};
