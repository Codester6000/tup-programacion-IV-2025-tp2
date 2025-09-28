import { param, body, validationResult } from "express-validator";

export const validarId = () =>
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo");

export const validarTarea = [
    body("nombre")
        .exists().withMessage("El nombre es requerido")
        .isString().withMessage("El nombre debe ser una cadena de texto")
        .isLength({ min: 3 }).withMessage("El nombre debe tener mínimo 3 caracteres")
        .trim(),
    body("completada")
        .optional()
        .isBoolean().withMessage("El campo completada debe ser booleano")
];

export const verificarValidaciones = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Error en la validación",
            errors: errores.array(),
        });
    }
    next();
};