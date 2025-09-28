import { param, body, validationResult } from "express-validator";

export const validarId = () =>
    param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un entero positivo");

export const validarCalculo = [
    body("base")
        .notEmpty().withMessage("La base es requerida")
        .isFloat({ gt: 0 }).withMessage("La base debe ser mayor que 0"),
    body("altura")
        .notEmpty().withMessage("La altura es requerida")
        .isFloat({ gt: 0 }).withMessage("La altura debe ser mayor que 0")
];

export const verificarValidaciones = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Error de validación",
            errors: errores.array(),
        });
    }
    next();
};