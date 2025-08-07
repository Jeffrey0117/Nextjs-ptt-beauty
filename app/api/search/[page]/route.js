// app/api/search/[page]/route.js
export async function GET(request, { params }) {
    const page = params.page;
  
    const res = await fetch(`https://chatbot.digitalgo.synology.me/search.php?page=${page}`);
    const data = await res.json();
  
    return Response.json(data);
  }
  