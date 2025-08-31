import Portfolio from "../models/portfolio.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

// Create Portfolio Item
export const createPortfolioItem = async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      category,
      client,
      technologies,
      images,
      featured,
      status,
      projectDate,
      completionDate,
      liveUrl,
      githubUrl,
      behanceUrl,
      testimonial,
      challenges,
      solutions,
      results,
      tags,
      seo,
    } = req.body;

    // Process images array to ensure proper structure
    const processedImages = (images || []).map((image, index) => ({
      url: image.url,
      public_id: image.public_id || `portfolio_${Date.now()}_${index}`, // Generate if not provided
      alt: image.alt || '',
      isFeatured: image.isFeatured || index === 0, // First image is featured by default
      order: image.order || index,
      width: image.width || null,
      height: image.height || null,
      format: image.format || null,
      size: image.size || null,
    }));

    const portfolioItem = new Portfolio({
      name,
      description,
      shortDescription,
      category,
      client,
      technologies: technologies || [],
      images: processedImages,
      featured: featured || false,
      status: status || 'draft',
      projectDate,
      completionDate,
      liveUrl,
      githubUrl,
      behanceUrl,
      testimonial,
      challenges: challenges || [],
      solutions: solutions || [],
      results: results || [],
      tags: tags || [],
      seo,
      createdBy: req.admin._id,
    });

    await portfolioItem.save();

    res.status(201).json({
      success: true,
      message: "Portfolio item created successfully.",
      data: portfolioItem,
    });
  } catch (error) {
    console.error("Create portfolio item error:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: Object.values(error.errors).map(err => err.message),
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get All Portfolio Items (Admin)
export const getAllPortfolioItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

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
      .populate('createdBy', 'name username')
      .populate('updatedBy', 'name username');

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
    console.error("Get all portfolio items error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Portfolio Item by ID
export const getPortfolioItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolioItem = await Portfolio.findById(id)
      .populate('createdBy', 'name username')
      .populate('updatedBy', 'name username');

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
    console.error("Get portfolio item by ID error:", error);
    
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

// Update Portfolio Item
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Process images if they exist in the update data
    if (updateData.images) {
      const processedImages = updateData.images.map((image, index) => ({
        url: image.url,
        public_id: image.public_id || `portfolio_${Date.now()}_${index}`,
        alt: image.alt || '',
        isFeatured: image.isFeatured || index === 0,
        order: image.order || index,
        width: image.width || null,
        height: image.height || null,
        format: image.format || null,
        size: image.size || null,
      }));
      updateData.images = processedImages;
    }

    // Add updatedBy field
    updateData.updatedBy = req.admin._id;

    const portfolioItem = await Portfolio.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name username')
      .populate('updatedBy', 'name username');

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item updated successfully.",
      data: portfolioItem,
    });
  } catch (error) {
    console.error("Update portfolio item error:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: Object.values(error.errors).map(err => err.message),
      });
    }

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

// Delete Portfolio Item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolioItem = await Portfolio.findByIdAndDelete(id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item deleted successfully.",
    });
  } catch (error) {
    console.error("Delete portfolio item error:", error);
    
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

// Bulk Delete Portfolio Items
export const bulkDeletePortfolioItems = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of portfolio item IDs to delete.",
      });
    }

    const result = await Portfolio.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} portfolio item(s) deleted successfully.`,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    console.error("Bulk delete portfolio items error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get Portfolio Categories
export const getPortfolioCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category');
    
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await Portfolio.countDocuments({ category });
        return { category, count };
      })
    );

    res.status(200).json({
      success: true,
      data: categoryStats,
    });
  } catch (error) {
    console.error("Get portfolio categories error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Toggle Portfolio Item Featured Status
export const toggleFeaturedStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolioItem = await Portfolio.findById(id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: "Portfolio item not found.",
      });
    }

    portfolioItem.featured = !portfolioItem.featured;
    portfolioItem.updatedBy = req.admin._id;
    await portfolioItem.save();

    res.status(200).json({
      success: true,
      message: `Portfolio item ${portfolioItem.featured ? 'featured' : 'unfeatured'} successfully.`,
      data: portfolioItem,
    });
  } catch (error) {
    console.error("Toggle featured status error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Upload Image for Portfolio Item
export const uploadPortfolioImage = async (req, res) => {
  try {
    console.log("Upload request received:", {
      hasFile: !!req.file,
      fileSize: req.file?.size,
      mimetype: req.file?.mimetype,
      originalname: req.file?.originalname
    });

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided.",
      });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    console.log("Uploading to Cloudinary...");
    
    // Upload to Cloudinary
    const uploadResult = await uploadImage(dataURI, 'portfolio');

    console.log("Upload successful:", uploadResult);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      data: {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        size: uploadResult.size
      },
    });
  } catch (error) {
    console.error("Upload portfolio image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image.",
      error: error.message
    });
  }
};

// Delete Image from Portfolio Item
export const deletePortfolioImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Public ID is required.",
      });
    }

    // Delete from Cloudinary
    await deleteImage(publicId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error("Delete portfolio image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image.",
    });
  }
};
