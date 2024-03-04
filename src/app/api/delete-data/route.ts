function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: Request, response: Response) {
  await timeout(3000);
  return Response.json({ ok: true })  
}


export async function GET(request: Request, response: Response) {
  return Response.json({ ok: true })
}
