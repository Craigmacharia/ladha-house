import React, { useState, useEffect } from 'react';
import { FaUtensils, FaLeaf, FaHeartbeat, FaAppleAlt, FaSearch } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { Link, useParams } from 'react-router-dom';

const recipes = [
  {
    condition: "High Cholesterol",
    title: "Oatmeal with Berries",
    image: "https://bing.com/th/id/BCO.1bb8d303-90d1-477c-ba34-b5676966c3d0.png",
    ingredients: [
      "1/2 cup rolled oats",
      "1 cup low-fat milk or almond milk",
      "1/4 cup fresh blueberries or strawberries",
      "1 tsp flaxseeds"
    ],
    steps: [
      "Cook oats with milk until soft.",
      "Top with berries and flaxseeds.",
      "Serve warm."
    ]
  },
  {
    condition: "High Cholesterol",
    title: "Grilled Salmon with Steamed Broccoli",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 salmon fillet",
      "1 cup steamed broccoli",
      "1 tsp olive oil",
      "Lemon juice"
    ],
    steps: [
      "Grill salmon with olive oil and lemon.",
      "Steam broccoli until tender.",
      "Serve together."
    ]
  },
  {
    condition: "High Cholesterol",
    title: "Avocado Toast with Egg",
    image: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 slice whole grain bread",
      "1/2 avocado",
      "1 poached egg",
      "Pinch of chili flakes"
    ],
    steps: [
      "Toast the bread.",
      "Mash avocado and spread on toast.",
      "Top with poached egg and chili flakes."
    ]
  },
  {
    condition: "High Cholesterol",
    title: "Quinoa Salad",
    image: "ladhahouse-frontend/public/apple pie.png",
    ingredients: [
      "1 cup cooked quinoa",
      "1/2 cucumber, diced",
      "1/4 cup cherry tomatoes",
      "1 tbsp olive oil",
      "Lemon juice"
    ],
    steps: [
      "Combine all ingredients in a bowl.",
      "Drizzle with olive oil and lemon juice.",
      "Toss and serve."
    ]
  },
  {
    condition: "High Cholesterol",
    title: "Walnut and Spinach Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup whole wheat pasta",
      "1 cup fresh spinach",
      "1/4 cup walnuts",
      "1 tsp olive oil",
      "Garlic powder"
    ],
    steps: [
      "Cook pasta according to package.",
      "Sauté spinach with olive oil and garlic.",
      "Toss with pasta and top with walnuts."
    ]
  },
  {
    condition: "High Cholesterol",
    title: "Berry Smoothie",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/2 cup mixed berries",
      "1 banana",
      "1 cup almond milk",
      "1 tbsp chia seeds"
    ],
    steps: [
      "Combine all ingredients in blender.",
      "Blend until smooth.",
      "Serve immediately."
    ]
  },
  {
    condition: "Diabetes",
    title: "Lentil and Spinach Stew",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/2 cup lentils",
      "2 cups spinach",
      "1 clove garlic, minced",
      "1 tsp cumin"
    ],
    steps: [
      "Simmer lentils until soft.",
      "Add garlic, cumin, and spinach.",
      "Cook for 10 more minutes and serve."
    ]
  },
  {
    condition: "Diabetes",
    title: "Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 grilled chicken breast",
      "Mixed greens",
      "Cherry tomatoes",
      "Cucumber slices",
      "Balsamic vinegar"
    ],
    steps: [
      "Slice chicken and place on salad.",
      "Add veggies and drizzle with balsamic.",
      "Toss and serve."
    ]
  },
  {
    condition: "Diabetes",
    title: "Egg and Vegetable Scramble",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "2 eggs",
      "1/4 cup bell peppers",
      "1/4 cup onions",
      "1 tsp olive oil"
    ],
    steps: [
      "Sauté vegetables in olive oil.",
      "Add beaten eggs and scramble.",
      "Serve hot."
    ]
  },
  {
    condition: "Diabetes",
    title: "Greek Yogurt with Nuts",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/2 cup plain Greek yogurt",
      "1 tbsp almonds",
      "1 tbsp walnuts",
      "Cinnamon to taste"
    ],
    steps: [
      "Place yogurt in bowl.",
      "Top with nuts and cinnamon.",
      "Serve chilled."
    ]
  },
  {
    condition: "Diabetes",
    title: "Turkey and Avocado Wrap",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 whole wheat tortilla",
      "3 slices turkey breast",
      "1/4 avocado",
      "Lettuce leaves"
    ],
    steps: [
      "Spread avocado on tortilla.",
      "Add turkey and lettuce.",
      "Roll up and serve."
    ]
  },
  {
    condition: "Diabetes",
    title: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup mixed vegetables",
      "1 tsp olive oil",
      "1 tbsp low-sodium soy sauce",
      "1 tsp ginger"
    ],
    steps: [
      "Heat oil in pan.",
      "Add vegetables and stir fry.",
      "Season with soy sauce and ginger."
    ]
  },
  {
    condition: "Acid Reflux",
    title: "Banana & Almond Butter Toast",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 slice whole wheat toast",
      "1 tbsp almond butter",
      "1/2 sliced banana"
    ],
    steps: [
      "Spread almond butter on toast.",
      "Top with sliced banana.",
      "Serve immediately."
    ]
  },
  {
    condition: "Acid Reflux",
    title: "Rice with Steamed Carrots and Zucchini",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/2 cup cooked rice",
      "1/2 cup steamed carrots",
      "1/2 cup steamed zucchini"
    ],
    steps: [
      "Cook rice.",
      "Steam carrots and zucchini until tender.",
      "Serve together."
    ]
  },
  {
    condition: "Acid Reflux",
    title: "Oatmeal with Almond Milk",
    image: "https://bing.com/th/id/BCO.4a33e496-7f14-4fae-9a67-a4524e914fff.png",
    ingredients: [
      "1/2 cup rolled oats",
      "1 cup almond milk",
      "1 tsp honey (optional)"
    ],
    steps: [
      "Cook oats with almond milk.",
      "Sweeten lightly if desired.",
      "Serve warm."
    ]
  },
  {
    condition: "Acid Reflux",
    title: "Baked Chicken with Mashed Potatoes",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 chicken breast",
      "1 medium potato",
      "1 tsp olive oil",
      "Pinch of salt"
    ],
    steps: [
      "Bake chicken at 375°F for 25 mins.",
      "Boil and mash potato.",
      "Serve together."
    ]
  },
  {
    condition: "Acid Reflux",
    title: "Melon Salad",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup cantaloupe",
      "1 cup honeydew",
      "Fresh mint leaves"
    ],
    steps: [
      "Cube melons.",
      "Combine in bowl with mint.",
      "Chill before serving."
    ]
  },
  {
    condition: "Acid Reflux",
    title: "Ginger Tea",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 inch fresh ginger",
      "1 cup water",
      "1 tsp honey (optional)"
    ],
    steps: [
      "Slice ginger and simmer in water for 10 mins.",
      "Strain and add honey if desired.",
      "Serve warm."
    ]
  },
  {
    condition: "Cancer Support",
    title: "Quinoa and Kale Bowl",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/2 cup cooked quinoa",
      "1 cup chopped kale",
      "1 tbsp olive oil",
      "1/4 avocado, sliced"
    ],
    steps: [
      "Saute kale with olive oil.",
      "Serve over quinoa and top with avocado."
    ]
  },
  {
    condition: "Cancer Support",
    title: "Berries and Chia Yogurt",
    image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/2 cup plain Greek yogurt",
      "1 tbsp chia seeds",
      "1/4 cup mixed berries"
    ],
    steps: [
      "Mix all ingredients in a bowl.",
      "Let sit for 10 mins or serve immediately."
    ]
  },
  {
    condition: "Cancer Support",
    title: "Roasted Sweet Potato with Black Beans",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 medium sweet potato",
      "1/2 cup black beans",
      "1 tsp olive oil",
      "Dash of cumin"
    ],
    steps: [
      "Roast sweet potato until soft.",
      "Heat beans with cumin.",
      "Top sweet potato with beans."
    ]
  },
  {
    condition: "Cancer Support",
    title: "Green Smoothie",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup spinach",
      "1 banana",
      "1/2 apple",
      "1 cup almond milk"
    ],
    steps: [
      "Combine all ingredients in blender.",
      "Blend until smooth.",
      "Serve immediately."
    ]
  },
  {
    condition: "Cancer Support",
    title: "Turmeric Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup brown rice",
      "1 tsp turmeric",
      "1 tsp olive oil"
    ],
    steps: [
      "Cook rice with turmeric.",
      "Fluff with olive oil.",
      "Serve warm."
    ]
  },
  {
    condition: "Cancer Support",
    title: "Broccoli Soup",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "2 cups broccoli florets",
      "1 cup vegetable broth",
      "1/4 cup almond milk",
      "Pinch of nutmeg"
    ],
    steps: [
      "Steam broccoli until tender.",
      "Blend with broth and milk.",
      "Season with nutmeg and serve warm."
    ]
  },
  {
    condition: "General Wellness",
    title: "Turmeric Ginger Smoothie",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 banana",
      "1/2 cup pineapple",
      "1/2 tsp turmeric",
      "1/2 tsp ginger",
      "1 cup coconut water"
    ],
    steps: [
      "Blend all ingredients until smooth.",
      "Serve chilled."
    ]
  },
  {
    condition: "General Wellness",
    title: "Mediterranean Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup mixed greens",
      "1/4 cup olives",
      "1/4 cup feta cheese",
      "1/4 cup cucumber",
      "1 tbsp olive oil"
    ],
    steps: [
      "Combine all ingredients in bowl.",
      "Drizzle with olive oil.",
      "Toss and serve."
    ]
  },
  {
    condition: "General Wellness",
    title: "Whole Grain Pancakes",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 cup whole wheat flour",
      "1 egg",
      "1 cup almond milk",
      "1 tsp baking powder"
    ],
    steps: [
      "Mix dry ingredients.",
      "Add wet ingredients and mix.",
      "Cook on griddle until golden."
    ]
  },
  {
    condition: "General Wellness",
    title: "Vegetable Omelette",
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "2 eggs",
      "1/4 cup mixed vegetables",
      "1 tsp olive oil"
    ],
    steps: [
      "Sauté vegetables in oil.",
      "Add beaten eggs and cook.",
      "Fold and serve."
    ]
  },
  {
    condition: "General Wellness",
    title: "Fruit and Nut Mix",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1/4 cup almonds",
      "1/4 cup walnuts",
      "1/4 cup dried cranberries",
      "1/4 cup dark chocolate chips"
    ],
    steps: [
      "Combine all ingredients.",
      "Mix well.",
      "Serve as snack."
    ]
  },
  {
    condition: "General Wellness",
    title: "Herbal Tea Blend",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ingredients: [
      "1 chamomile tea bag",
      "1 peppermint tea bag",
      "1 cup hot water",
      "1 tsp honey (optional)"
    ],
    steps: [
      "Steep tea bags in hot water for 5 mins.",
      "Add honey if desired.",
      "Serve warm."
    ]
  }
];

const RecipeCard = ({ recipe }) => {
  return (
    <div 
      className="card mb-4 border-0 shadow-sm hover-effect"
      style={{ 
        backgroundColor: '#fff',
        borderBottom: '4px solid #8d6e63',
        transition: 'all 0.3s ease'
      }}
    >
      <div 
        className="card-header d-flex justify-content-between align-items-center"
        style={{ 
          backgroundColor: '#efebe9',
          color: '#5d4037',
          borderBottom: '1px solid #d7ccc8'
        }}
      >
        <h4 className="mb-0 d-flex align-items-center">
          {conditionIcons[recipe.condition] || <FaUtensils className="me-2" />}
          {recipe.title}
        </h4>
        <span 
          className="badge rounded-pill"
          style={{ 
            backgroundColor: '#8d6e63',
            color: 'white'
          }}
        >
          {recipe.condition}
        </span>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="img-fluid rounded mb-3"
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold" style={{ color: '#5d4037' }}>
              <FaUtensils className="me-2" style={{ color: '#8d6e63' }} />
              Ingredients:
            </h5>
            <ul className="list-unstyled">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="mb-2" style={{ color: '#6d4c41' }}>
                  <span className="me-2" style={{ color: '#8d6e63' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold" style={{ color: '#5d4037' }}>
              <FaLeaf className="me-2" style={{ color: '#8d6e63' }} />
              Preparation:
            </h5>
            <ol>
              {recipe.steps.map((step, i) => (
                <li key={i} className="mb-2" style={{ color: '#6d4c41' }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

const conditionIcons = {
  "High Cholesterol": <FaHeartbeat className="me-2" />,
  "Diabetes": <FaAppleAlt className="me-2" />,
  "Acid Reflux": <FaLeaf className="me-2" />,
  "Cancer Support": <FaHeartbeat className="me-2" />,
  "General Wellness": <GiMeal className="me-2" />
};

const HealthyRecipesHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const slides = [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const uniqueConditions = [...new Set(recipes.map(recipe => recipe.condition))];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
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
            <FaUtensils className="me-3" />
            Healthy Recipes
            <GiMeal className="ms-3" />
          </h1>
        </div>
      </div>

      <div className="container py-5">
        <div className={`row justify-content-center ${isVisible ? 'fade-in' : ''}`}>
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ color: '#5d4037' }}>Nourish Your Body</h2>
              <p className="lead" style={{ color: '#8d6e63' }}>
                Discover recipes tailored to your health needs
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-5">
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#efebe9', borderColor: '#d7ccc8' }}>
                  <FaSearch style={{ color: '#8d6e63' }} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search recipes by name, condition, or ingredient..."
                  style={{ borderColor: '#d7ccc8' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Condition Navigation */}
            <div className="mb-5">
              <h4 className="fw-bold mb-4" style={{ color: '#5d4037' }}>Browse by Health Condition:</h4>
              <div className="d-flex flex-wrap gap-2">
                {uniqueConditions.map((condition, index) => (
                  <Link 
                    key={index} 
                    to={`/recipes/${condition.toLowerCase().replace(/\s+/g, '-')}`}
                    className="btn btn-outline-primary"
                    style={{ 
                      borderColor: '#8d6e63', 
                      color: '#5d4037',
                      backgroundColor: '#efebe9'
                    }}
                  >
                    {conditionIcons[condition]} {condition}
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Recipes */}
            <h4 className="fw-bold mb-4" style={{ color: '#5d4037' }}>Featured Recipes:</h4>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))
            ) : (
              <div className="text-center py-4">
                <h5 style={{ color: '#8d6e63' }}>No recipes found matching your search.</h5>
              </div>
            )}
          </div>
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
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        li {
          transition: all 0.3s ease;
        }
        li:hover {
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
};

const ConditionRecipes = () => {
  const { condition } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formattedCondition = condition.replace(/-/g, ' ');
  const conditionRecipes = recipes.filter(recipe => 
    recipe.condition.toLowerCase() === formattedCondition.toLowerCase()
  );

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container py-5">
        <div className={`row justify-content-center ${isVisible ? 'fade-in' : ''}`}>
          <div className="col-lg-10">
            <div className="d-flex align-items-center mb-4">
              <Link to="/recipes" className="btn btn-sm me-3" style={{ backgroundColor: '#8d6e63', color: 'white' }}>
                Back to All Recipes
              </Link>
              <h2 className="fw-bold mb-0" style={{ color: '#5d4037' }}>
                {conditionIcons[formattedCondition] || <FaUtensils className="me-2" />}
                {formattedCondition} Recipes
              </h2>
            </div>

            <p className="lead mb-5" style={{ color: '#8d6e63' }}>
              {conditionRecipes.length} healthy recipes tailored for {formattedCondition.toLowerCase()}
            </p>

            {conditionRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { HealthyRecipesHome, ConditionRecipes };
