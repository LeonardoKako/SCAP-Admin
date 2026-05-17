import authService from "./authService.js";

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const loginBody = {
            email,
            password
        };

        const loginResponse = await authService.login(loginBody);

        return res.status(200).json({
            success: true,
            message: "Login efetuado com sucesso!",
            ...loginResponse
        });
    } catch(error) {
        return next(error);
    }
}