import React, { useState, useEffect } from 'react';
import { FaCoffee, FaUtensils, FaWineGlassAlt, FaLeaf, FaIceCream, FaSearch } from 'react-icons/fa';
import { GiFullPizza, GiSandwich, GiFruitBowl, GiMeal } from 'react-icons/gi';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow images
  const slides = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const menuCategories = [
    { id: 'breakfast', name: 'Breakfast', icon: <FaCoffee /> },
    { id: 'lunch', name: 'Lunch', icon: <GiSandwich /> },
    { id: 'dinner', name: 'Dinner', icon: <FaUtensils /> },
    { id: 'drinks', name: 'Drinks', icon: <FaWineGlassAlt /> },
    { id: 'desserts', name: 'Desserts', icon: <FaIceCream /> },
    { id: 'specials', name: 'Specials', icon: <GiMeal /> }
  ];

  const menuItems = {
    breakfast: [
      { 
        id: 1, 
        name: 'Ladha Breakfast', 
        description: 'Eggs your way, artisanal bread, fresh fruit, and coffee', 
        price: 1200,
        popular: true,
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 2, 
        name: 'Plain Toast', 
        description: 'Smashed avocado, cherry tomatoes, feta', 
        price: 950,
        image: 'toast.png'
      },
      { 
        id: 3, 
        name: 'Pancake Stack', 
        description: 'Fluffy pancakes with maple syrup and seasonal berries', 
        price: 850,
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 4, 
        name: 'Full English', 
        description: 'Eggs, bacon, sausages, beans, mushrooms, toast', 
        price: 1300,
        image: 'full English.png'
      },
      { 
        id: 5, 
        name: 'French Toast', 
        description: 'Brioche bread with cinnamon and maple syrup', 
        price: 900,
        image: 'French toast.png'
      },
      { 
        id: 6, 
        name: 'Breakfast Burrito.png', 
        description: 'Scrambled eggs, beans, cheese, and salsa in a tortilla', 
        price: 1100,
        image: 'burrito.png'
      },
      { 
        id: 7, 
        name: 'Greek Yogurt Bowl', 
        description: 'With honey, granola, and fresh berries', 
        price: 800,
        image: 'Greek.png'
      },
      { 
        id: 8, 
        name: 'Breakfast Smoothie', 
        description: 'Banana, oats, peanut butter, and almond milk', 
        price: 750,
        image: 'breakfast smoothie.png'
      },
      { 
        id: 9, 
        name: 'Shakshuka', 
        description: 'Eggs poached in tomato sauce with spices', 
        price: 1050,
        image: 'beef.png'
      },
    ],
    lunch: [
      { 
        id: 11, 
        name: 'Wood-Fired Pizza', 
        description: 'Traditional Margherita with fresh basil and mozzarella', 
        price: 1400,
        popular: true,
        image: 'pizza.png'
      },
      { 
        id: 12, 
        name: 'Gourmet Burger', 
        description: 'Angus beef, caramelized onions, special sauce', 
        price: 1100,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 13, 
        name: 'Chicken Caesar Salad', 
        description: 'Romaine, grilled chicken, parmesan, croutons', 
        price: 1050,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 14, 
        name: 'Coastal Pilau', 
        description: 'Three soft tacos with all the fixings', 
        price: 1200,
        image: 'pilau.png'
      },
      { 
        id: 15, 
        name: 'Club Sandwich', 
        description: 'Triple-decker with turkey, bacon, and avocado', 
        price: 950,
        image: 'club sandwich.png'
      },
      { 
        id: 16, 
        name: 'Pasta Carbonara', 
        description: 'Spaghetti with creamy egg sauce and pancetta', 
        price: 1250,
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 17, 
        name: 'Egg mushy', 
        description: 'With tahini sauce and fresh vegetables', 
        price: 900,
        image: 'egg.png'
      },
      { 
        id: 18, 
        name: 'Beef Stir Fry', 
        description: 'With mixed vegetables and jasmine rice', 
        price: 1350,
        image: 'beef stir fry.png'
      },
      { 
        id: 19, 
        name: 'Fish & Chips', 
        description: 'Beer-battered cod with tartar sauce', 
        price: 1400,
        image: 'fish and chips.png'
      },
    ],
    dinner: [
      { 
        id: 21, 
        name: 'Grilled Salmon', 
        description: 'With lemon butter sauce and seasonal vegetables', 
        price: 1800,
        popular: true,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 22, 
        name: 'Filet Mignon', 
        description: '8oz tenderloin with red wine reduction', 
        price: 2500,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 23, 
        name: 'Samosa Special', 
        description: 'Herb-marinated with mint jelly', 
        price: 2200,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 24, 
        name: 'Mushroom Risotto', 
        description: 'Creamy arborio rice with wild mushrooms', 
        price: 1600,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 25, 
        name: 'Duck Confit', 
        description: 'With cherry sauce and potato gratin', 
        price: 2400,
        image: 'duck confit.png'
      },
      { 
        id: 26, 
        name: 'Ugali and veggies', 
        description: 'With truffle mashed potatoes', 
        price: 2800,
        image: 'ugali.png'
      },
      { 
        id: 27, 
        name: 'Seafood Paella', 
        description: 'With saffron rice and mixed seafood', 
        price: 2100,
        image: 'seafood.png'
      },
      { 
        id: 28, 
        name: 'Vegetable Lasagna', 
        description: 'Layers of pasta, cheese, and roasted vegetables', 
        price: 1500,
        image: 'lasagna.png'
      },
      { 
        id: 29, 
        name: 'Pork Tenderloin', 
        description: 'With apple compote and roasted potatoes', 
        price: 1900,
        image: 'pork.png'
      },
    ],
    drinks: [
      { 
        id: 31, 
        name: 'Signature Coffee', 
        description: 'Locally roasted beans prepared by our barista', 
        price: 350,
        popular: true,
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 32, 
        name: 'Tropical Smoothie', 
        description: 'Mango, pineapple, and banana blend', 
        price: 450,
        image: 'tropical smoothie.png'
      },
      { 
        id: 33, 
        name: 'Craft Cocktails', 
        description: 'Ask your server about our seasonal specials', 
        price: 650,
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 34, 
        name: 'Local Beer', 
        description: 'Selection of Kenyan craft brews', 
        price: 400,
        image: 'beer.png'
      },
      { 
        id: 35, 
        name: 'Wine Selection', 
        description: 'Glass of red or white from our curated list', 
        price: 550,
        image: 'wine.png'
      },
      { 
        id: 36, 
        name: 'Iced Tea', 
        description: 'Freshly brewed with lemon', 
        price: 300,
        image: 'iced tea.png'
      },
      { 
        id: 37, 
        name: 'Fresh Juices', 
        description: 'Orange, pineapple, or watermelon', 
        price: 350,
        image: 'fresh juice.png'
      },
      { 
        id: 38, 
        name: 'Sparkling Water', 
        description: 'With lemon or lime', 
        price: 250,
        image: 'sparkling.png'
      },
      { 
        id: 39, 
        name: 'Hot Chocolate', 
        description: 'With whipped cream and marshmallows', 
        price: 400,
        image: 'hot chocolate.png'
      },
    ],
    desserts: [
      { 
        id: 41, 
        name: 'Chocolate Lava Cake', 
        description: 'Warm chocolate cake with vanilla ice cream', 
        price: 750,
        popular: true,
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      },
      { 
        id: 42, 
        name: 'Fruit Platter', 
        description: 'Seasonal fresh fruits with honey drizzle', 
        price: 600,
        image: 'fruit platter.png'
      },
      { 
        id: 43, 
        name: 'Crème Brûlée', 
        description: 'Classic vanilla with caramelized sugar', 
        price: 700,
        image: 'creme brule.png'
      },
      { 
        id: 44, 
        name: 'Tiramisu', 
        description: 'Italian classic with coffee and mascarpone', 
        price: 800,
        image: 'tiramisu.png'
      },
      { 
        id: 45, 
        name: 'Cheesecake', 
        description: 'New York style with berry compote', 
        price: 750,
        image: 'cheesecake.png'
      },
      { 
        id: 46, 
        name: 'Apple Pie', 
        description: 'With cinnamon ice cream', 
        price: 650,
        image: 'apple pie.png'
      },
      { 
        id: 47, 
        name: 'Chocolate Mousse', 
        description: 'Light and airy with whipped cream', 
        price: 600,
        image: 'chocolate mousse.png'
      },
      { 
        id: 48, 
        name: 'Ice Cream Sundae', 
        description: 'Three scoops with your choice of toppings', 
        price: 550,
        image: 'Ice cream.png'
      },
      { 
        id: 49, 
        name: 'Panna Cotta', 
        description: 'With fresh berries', 
        price: 700,
        image: 'panna cotta.png'
      },
    ],
    specials: [
      { 
        id: 51, 
        name: 'Chef\'s Special', 
        description: 'Daily creation from our head chef', 
        price: 1800,
        popular: true,
        image: 'chef\'s special.png'
      },
      { 
        id: 52, 
        name: 'Local Delicacy', 
        description: 'Traditional Kenyan dish of the day', 
        price: 1500,
        image: 'pork tenderloin.png'
      },
      { 
        id: 53, 
        name: 'Oreo Bowl', 
        description: 'Oreo bowl special', 
        price: 950,
        image: 'oreo.png'
      },
      { 
        id: 54, 
        name: 'Fish Selection', 
        description: 'Fresh seafood prepared to perfection', 
        price: 2000,
        image: 'tilapia.png'
      },
      { 
        id: 55, 
        name: 'Nyama Choma Platter', 
        description: 'Selection of seasonal vegetables and grains', 
        price: 1200,
        image: 'Nyama Choma.png'
      },
      { 
        id: 56, 
        name: 'Tasting Menu', 
        description: 'Five-course journey through our best dishes', 
        price: 3500,
        image: 'big.png'
      },
      { 
        id: 57, 
        name: 'Wine Pairing', 
        description: 'Selected wines to complement your meal', 
        price: 2500,
        image: 'wine.png'
      },
      { 
        id: 58, 
        name: 'Kids Special', 
        description: 'Child-friendly portion of our most popular dishes', 
        price: 800,
        image: 'kids.png'
      },
      { 
        id: 59, 
        name: 'Vegetarian Feast', 
        description: 'Selection of our best plant-based dishes', 
        price: 1600,
        image: 'vegan.png'
      },
    ]
  };

  const filteredItems = menuItems[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-5" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Slideshow */}
      <div className="position-relative" style={{ height: '300px', overflow: 'hidden' }}>
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`position-absolute w-100 h-100 ${index === currentSlide ? 'active-slide' : 'inactive-slide'}`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'opacity 1s ease-in-out'
            }}
          />
        ))}
        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" 
          style={{ backgroundColor: 'rgba(93, 64, 55, 0.6)' }}>
          <h1 className="display-4 text-white text-center fw-bold">
            LadhaHouse Menu
          </h1>
        </div>
      </div>

      <div className="container">
        {/* Search Bar */}
        <div className="row justify-content-center my-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text" style={{ 
                backgroundColor: '#efebe9', 
                borderColor: '#d7ccc8',
                color: '#8d6e63'
              }}>
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  borderColor: '#d7ccc8',
                  color: '#5d4037'
                }}
              />
            </div>
          </div>
        </div>

        {/* Menu Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ color: '#5d4037' }}>
            Our Culinary Offerings
          </h2>
          <p className="lead" style={{ color: '#8d6e63' }}>
            Fresh ingredients, authentic flavors
          </p>
        </div>

        {/* Category Tabs */}
        <div className="d-flex justify-content-center flex-wrap mb-5">
          {menuCategories.map(category => (
            <button
              key={category.id}
              className={`btn mx-2 mb-2 d-flex align-items-center ${activeCategory === category.id ? 'active-category' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedItem(null);
                setSearchQuery('');
              }}
              style={{
                backgroundColor: activeCategory === category.id ? '#8d6e63' : '#efebe9',
                color: activeCategory === category.id ? 'white' : '#5d4037',
                border: 'none',
                borderRadius: '50px',
                padding: '8px 20px',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="me-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="row g-4">
          {filteredItems.map(item => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <div 
                className={`card border-0 shadow-sm h-100 hover-effect ${selectedItem === item.id ? 'selected-item' : ''}`}
                style={{ 
                  backgroundColor: selectedItem === item.id ? '#efebe9' : 'white',
                  borderBottom: '4px solid #8d6e63',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedItem === item.id ? 'translateY(-5px)' : 'none'
                }}
                onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
              >
                <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  {item.popular && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge" style={{ 
                        backgroundColor: '#8d6e63',
                        color: 'white'
                      }}>
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h4 style={{ color: '#5d4037' }} className="mb-2">
                        {item.name}
                      </h4>
                      <p style={{ color: '#6d4c41' }} className="mb-0">{item.description}</p>
                    </div>
                    <h5 style={{ color: '#8d6e63' }} className="mb-0">
                      KES {item.price.toLocaleString()}
                    </h5>
                  </div>
                  
                  {selectedItem === item.id && (
                    <div 
                      className="mt-3 pt-3"
                      style={{ borderTop: '1px dashed #d7ccc8' }}
                    >
                      <button 
                        className="btn w-100"
                        style={{ 
                          backgroundColor: '#8d6e63',
                          color: 'white'
                        }}
                      >
                        Add to Order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Notes */}
        <div className="mt-5 pt-4 text-center" style={{ borderTop: '1px solid #d7ccc8' }}>
          <h5 style={{ color: '#5d4037' }} className="mb-3">
            <FaLeaf className="me-2" style={{ color: '#8d6e63' }} />
            Dietary Options Available
          </h5>
          <p style={{ color: '#6d4c41' }} className="mb-0">
            Ask your server about vegetarian, vegan, and gluten-free alternatives
          </p>
        </div>
      </div>

      <style jsx>{`
        .active-slide {
          opacity: 1;
        }
        .inactive-slide {
          opacity: 0;
        }
        .hover-effect:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .selected-item {
          box-shadow: 0 5px 15px rgba(141, 110, 99, 0.3) !important;
        }
        .btn:hover {
          background-color: #6d4c41 !important;
          color: white !important;
        }
        .form-control:focus {
          border-color: #8d6e63 !important;
          box-shadow: 0 0 0 0.25rem rgba(141, 110, 99, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default Menu;