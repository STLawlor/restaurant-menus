const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });

    restaurant1 = await Restaurant.create({
      name: "Pie World",
      location: "Manchester",
      cuisine: "Pies",
      rating: 5
    });

    menu1 = await Menu.create({
      title: "Pies",
    });

    menu2 = await Menu.create({
      title: "Drinks",
    });
  });

  test("can create a Restaurant", async () => {
    expect(restaurant1).toBeInstanceOf(Restaurant);
    expect(restaurant1.name).toEqual("Pie World");
    expect(restaurant1.location).toEqual("Manchester");
    expect(restaurant1.cuisine).toEqual("Pies");
    expect(restaurant1.rating).toEqual(5);
  });

  test("can create a Menu", async () => {
    expect(menu1).toBeInstanceOf(Menu);
    expect(menu1.title).toEqual("Pies");
  });

  test("can find Restaurants", async () => {
    const allRestaurants = await Restaurant.findAll();
    expect(allRestaurants[0]).toBeInstanceOf(Restaurant);
    expect(allRestaurants[0].name).toEqual("Pie World");
  });

  test("can find Menus", async () => {
    const allMenus = await Menu.findAll();
    expect(allMenus[0]).toBeInstanceOf(Menu);
    expect(allMenus[0].title).toEqual("Pies");
  });

  test("can add Menus to Restaurant", async () => {
    await restaurant1.addMenu([menu1, menu2]);
    const res1Menus = await restaurant1.getMenus();

    expect(res1Menus.length).toEqual(2);
  })

  test("can delete Restaurants", async () => {
    const restaurant2 = await Restaurant.create({
      name: "Cake Land",
      location: "Manchester",
      cuisine: "Cake",
      rating: 4
    });
    await restaurant2.destroy();
    const allRestaurants = await Restaurant.findAll();
    expect(allRestaurants.length).toEqual(1);
  });
});
