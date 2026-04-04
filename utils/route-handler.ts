import { ErrorHandler } from "@/lib/error/error-handler";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<Record<string, string>> };
type HandlerFunction = (req: NextRequest, ctx: RouteContext) => Promise<Response>;

export function RouteHandler(handler: HandlerFunction) {
    return async (req: NextRequest, ctx: RouteContext) => {
        try {
            return await handler(req, ctx);
        } catch (error) {
            return ErrorHandler(error);
        }
    };
}