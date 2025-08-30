import Portfolio from "../models/portfolio.js";

// Get Public Portfolio Items (for landing page)
export const getPublicPortfolioItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = { status: 'published' }; // Only published items

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by featured
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const portfolioItems = await Portfolio.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-createdBy -updatedBy -seo -__v'); // Exclude sensitive fields

    const total = await Portfolio.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        portfolioItems,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Get public portfolio items error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Featured Portfolio Items
export const getFeaturedPortfolioItems = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const portfolioItems = await Portfolio.find({
      status: 'published',
      featured: true,
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-createdBy -updatedBy -seo -__v');

    res.status(200).json({
      success: true,
      data: portfolioItems,
    });
  } catch (error) {
    console.error("Get featured portfolio items error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Portfolio Item by ID (Public)
export const getPublicPortfolioItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolioItem = await Portfolio.findOne({
      _id: id,
      status: 'published',
    }).select('-createdBy -updatedBy -seo -__v');

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolioItem,
    });
  } catch (error) {
    console.error("Get public portfolio item by ID error:", error);
    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio item ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Portfolio Categories (Public)
export const getPublicPortfolioCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category', { status: 'published' });
    
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await Portfolio.countDocuments({ 
          category, 
          status: 'published' 
        });
        return { category, count };
      })
    );

    res.status(200).json({
      success: true,
      data: categoryStats,
    });
  } catch (error) {
    console.error("Get public portfolio categories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Portfolio Stats (Public)
export const getPublicPortfolioStats = async (req, res) => {
  try {
    const totalItems = await Portfolio.countDocuments({ status: 'published' });
    const featuredItems = await Portfolio.countDocuments({ 
      status: 'published', 
      featured: true 
    });
    const categories = await Portfolio.distinct('category', { status: 'published' });

    res.status(200).json({
      success: true,
      data: {
        totalItems,
        featuredItems,
        totalCategories: categories.length,
      },
    });
  } catch (error) {
    console.error("Get public portfolio stats error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
