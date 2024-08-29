import { Client } from '@elastic/elasticsearch';

export const esClient = new Client({
  node: 'http://localhost:9200',
});

export const createUserIndex = async () => {
  const indexExists = await esClient.indices.exists({ index: 'users' });
  if (!indexExists) {
    await esClient.indices.create({
      index: 'users',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            username: { type: 'text' },
            email: { type: 'text' },
            isActive: { type: 'boolean' },
          },
        },
      },
    });
  }
};
