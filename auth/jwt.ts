var jwt =  require('jsonwebtoken');


export async function generateToken(userId: number) {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET!, { expiresIn: '1h' });
}
// var generateToken = (userId: number) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
// };

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

// module.exports = { generateToken, verifyToken };
