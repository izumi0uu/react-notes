export async function getAllNotes() {
  const response = await fetch(`${process.env.STRAPI_URL}/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(({ id, title, content, slug, updateAt }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updateAt,
    });
  });

  return res;
}

export async function getNote(uuid) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0]?.title,
    content: data.data[0]?.content,
    updateTime: data.data[0]?.updatedAt,
    id: data.data[0]?.id,
  };
}

export async function addNote(data) {
  const response = await fetch(`${process.env.STRAPI_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });

  const res = await response.json();
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${process.env.STRAPI_URL}/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });

  const res = await response.json();
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`${process.env.STRAPI_URL}/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
}
