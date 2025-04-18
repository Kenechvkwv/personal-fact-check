import { body, validationResult, } from "express-validator";
import AppError from "../utils/appError.js";
// Custom validator with proper type
const passwordMatchValidator = (value, meta) => {
    return value === meta.req.body.password;
};
// Validation rules for user signup
export const userValidationRules = () => {
    return [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please provide a valid email"),
        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters"),
        body("passwordConfirm")
            .custom(passwordMatchValidator)
            .withMessage("Passwords do not match"),
        body("languagePreference").optional().isString(),
    ];
};
// Validation rules for claims
export const claimValidationRules = () => {
    return [
        body("claimType")
            .isIn(["text", "url", "image", "offline"])
            .withMessage("Invalid claim type"),
        body("content").notEmpty().withMessage("Content is required"),
        body("language")
            .optional()
            .isString()
            .withMessage("Language must be a string"),
    ];
};
// Validation rules for languages
export const languageValidationRules = () => {
    return [
        body("code").isString().notEmpty().withMessage("Language code is required"),
        body("name").isString().notEmpty().withMessage("Language name is required"),
        body("nativeName")
            .isString()
            .notEmpty()
            .withMessage("Native name is required"),
        body("isActive")
            .optional()
            .isBoolean()
            .withMessage("isActive must be a boolean"),
    ];
};
// Middleware to check validation results
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // Format errors more cleanly
    const formattedErrors = errors.array().map((err) => {
        // Handle both field errors and general errors
        if ("path" in err) {
            return {
                field: err.path,
                message: err.msg,
            };
        }
        return {
            message: err.msg,
        };
    });
    return next(new AppError("Validation failed", 400, formattedErrors // This should match the updated AppError signature
    ));
};
