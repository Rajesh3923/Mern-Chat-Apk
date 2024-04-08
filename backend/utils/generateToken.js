import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as a cookie in the response
const generateToken = (userId, res) => {
  // Generating a JWT token with user id payload, using the secret key from environment variables, and setting expiry time to 15 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Setting the JWT token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 15 * 60 * 60 * 1000, // Setting the maximum age of the cookie to 15 days in milliseconds
    httpOnly: true, // Making the cookie accessible only through HTTP requests, not client-side scripts
    sameSite: true, // Restricting the cookie to be sent only to the same site as the request origin
    secure: process.env.NODE_ENV !== "development", // Making the cookie secure only if not in development environment
  });
};

// Exporting the generateToken function as the default export of this module
export default generateToken;










//useful info 
/*
JWT (JSON Web Tokens) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

JWTs are commonly used for authentication and information exchange in web development. Here's a simplified example to illustrate its use:

Suppose you have a web application where users need to log in to access certain features. When a user successfully logs in, you generate a JWT containing information about the user, such as their user ID and any relevant permissions. You then send this JWT to the client, where it is stored, typically in local storage or a cookie.

Now, whenever the client makes a request to the server to access a protected resource, such as viewing their profile or creating a post, they include the JWT in the request, typically as an Authorization header.

On the server side, when the server receives a request with a JWT, it verifies the JWT's signature to ensure that it hasn't been tampered with. If the signature is valid, the server can extract the user information from the JWT and use it to authenticate and authorize the request. For example, it can check if the user has the necessary permissions to access the requested resource.

Here's a simplified step-by-step breakdown:

1. **User Authentication**: User logs in with their credentials (username/password).
2. **JWT Generation**: Upon successful authentication, the server generates a JWT containing relevant user information (e.g., user ID, username, role).
3. **JWT Sending**: The server sends the JWT back to the client (typically in the response body or as a cookie).
4. **Client Storage**: The client stores the JWT, typically in local storage or a cookie, and sends it along with subsequent requests to the server.
5. **Request Authorization**: When the client makes a request to access a protected resource, it includes the JWT in the request (usually as an Authorization header).
6. **JWT Verification**: The server receives the request and verifies the JWT's signature to ensure its authenticity and integrity.
7. **User Authorization**: If the JWT is valid, the server extracts the user information from the JWT and uses it to authenticate and authorize the request.
8. **Response**: The server responds to the request based on the user's permissions and the requested resource.

JWTs offer several advantages, including statelessness (since all necessary information is contained within the token), scalability, and flexibility. However, it's essential to handle JWTs securely, especially regarding token expiration, token validation, and sensitive data in the payload.*/