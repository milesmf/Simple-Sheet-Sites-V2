import { env } from "@/lib/env";

export const isAdminRequest = (request: Request) => {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  return token === env.ADMIN_TOKEN;
};