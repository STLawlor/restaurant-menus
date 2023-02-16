const { sequelize } = require("./db");
const { Restaurant, Menu, Item } = require("./models/index");
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
      rating: 5,
    });

    menu1 = await Menu.create({
      title: "Pies",
    });

    menu2 = await Menu.create({
      title: "Drinks",
    });

    menu3 = await Menu.create({
      title: "Cakes",
    });

    item1 = await Item.create({
      name: "Veggie Pie",
      image: "image.url",
      price: 3.5,
      vegetarian: true,
    });

    item2 = await Item.create({
      name: "Cheese and Onion Pie",
      image: "image.url",
      price: 3.5,
      vegetarian: true,
    });

    item3 = await Item.create({
      name: "Raspberry Pie",
      image: "image.url",
      price: 2.5,
      vegetarian: true,
    });
  });

  test("can create a Restaurant", () => {
    expect(restaurant1).toBeInstanceOf(Restaurant);
    expect(restaurant1.name).toEqual("Pie World");
    expect(restaurant1.location).toEqual("Manchester");
    expect(restaurant1.cuisine).toEqual("Pies");
    expect(restaurant1.rating).toEqual(5);
  });

  test("can create a Menu", () => {
    expect(menu1).toBeInstanceOf(Menu);
    expect(menu1.title).toEqual("Pies");
  });

  test("can create an Item", () => {
    expect(item1).toBeInstanceOf(Item);
    expect(item1.price).toEqual(3.5);
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
  });

  test("can add Items to Menus", async () => {
    await menu1.addItem(item1);
    const menu1Items = await menu1.getItems();

    expect(menu1Items.length).toEqual(1);
  });

  test("can add Menus to Items", async () => {
    await item3.addMenu([menu1, menu3]);
    const item3Menus = await item3.getMenus();

    expect(item3Menus.length).toEqual(2);
  });

  test("can delete Restaurants", async () => {
    const restaurant2 = await Restaurant.create({
      name: "Cake Land",
      location: "Manchester",
      cuisine: "Cake",
      rating: 4,
    });
    await restaurant2.destroy();
    const allRestaurants = await Restaurant.findAll();
    expect(allRestaurants.length).toEqual(1);
  });

  test("can eager load data", async () => {
    const menuData = await Menu.findAll({
      include: [{ model: Restaurant }, { model: Item }],
    });

    expect(menuData.length).toEqual(3);
    expect(menuData[0].Items.length).toEqual(2);
    expect(menuData[1].Restaurant.name).toEqual("Pie World");
  });
});
