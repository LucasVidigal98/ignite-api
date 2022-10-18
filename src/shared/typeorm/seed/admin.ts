import createConnection from '../';

import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO users_tmg (id, name, email, password, created_at, is_admin)
    values('${id}', 'admin', 'admin@ignite.com', '${password}', 'now()', true)
  `)

  await connection.close();
}

create().then(() => console.log('User Admin is created'));