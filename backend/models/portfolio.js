import mongoose, { Schema } from "mongoose";

const portfolioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      enum: ['web_development', 'mobile_app', 'ui_ux_design', 'branding', 'marketing', 'other'],
    },
    client: {
      type: String,
      trim: true,
    },
    technologies: [{
      type: String,
      trim: true,
    }],
    images: [{
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: '',
      },
      isFeatured: {
        type: Boolean,
        default: false,
      },
      order: {
        type: Number,
        default: 0,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      format: {
        type: String,
      },
      size: {
        type: Number,
      },
    }],
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    projectDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    behanceUrl: {
      type: String,
      trim: true,
    },
    testimonial: {
      text: String,
      author: String,
      position: String,
      company: String,
    },
    challenges: [String],
    solutions: [String],
    results: [String],
    tags: [String],
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { 
    timestamps: true 
  }
);

// Index for better search performance
portfolioSchema.index({ name: 'text', description: 'text', tags: 'text' });
portfolioSchema.index({ category: 1, status: 1, featured: 1 });
portfolioSchema.index({ createdAt: -1 });

// Virtual for featured image
portfolioSchema.virtual('featuredImage').get(function() {
  const featuredImage = this.images.find(img => img.isFeatured);
  return featuredImage || this.images[0];
});

// Method to get public portfolio data (without sensitive info)
portfolioSchema.methods.toPublicJSON = function() {
  const obj = this.toObject();
  delete obj.createdBy;
  delete obj.updatedBy;
  delete obj.seo;
  return obj;
};

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
