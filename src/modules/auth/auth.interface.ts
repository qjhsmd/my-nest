export interface JwtPayload {
  iss: string; //(issuer)：签发人
  // exp: string; //(expiration time)：过期时间
  // sub: string; //(subject)：主题
  // aud: string; //(audience)：受众
  // nbf: string; //(Not Before)：生效时间
  // iat: string; //(Issued At)：签发时间
  jti: number; //(JWT ID)：编号
  user: string;
}
