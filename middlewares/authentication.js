const { ValidateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
            next();
        }

        else {
            try {
                const userpayload = ValidateToken(tokenCookieValue);
                req.user = userpayload;
                console.log(userpayload)


            } catch (error) {
                req.error = error
            }
            next();
        }

    }
}
module.exports =
{
    checkForAuthenticationCookie
}