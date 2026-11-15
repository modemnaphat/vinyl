export function GET() {
  return Response.json({
    status: 200,
    message: "status ok",
    timestamp: new Date().toISOString(),
  });
}