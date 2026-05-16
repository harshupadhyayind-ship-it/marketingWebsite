import clientPromise from "./mongodb";

const DB = "branddaid";

async function getCollection(name: string) {
  const client = await clientPromise;
  return client.db(DB).collection(name);
}

export async function getContent(key: string) {
  const col = await getCollection(`content_${key}`);
  const doc = await col.findOne({ _id: "singleton" } as any);
  if (!doc) return null;
  const { _id, ...data } = doc;
  return data;
}

export async function setContent(key: string, data: unknown) {
  const col = await getCollection(`content_${key}`);
  await col.replaceOne(
    { _id: "singleton" } as any,
    { _id: "singleton", ...(data as object) },
    { upsert: true }
  );
}
