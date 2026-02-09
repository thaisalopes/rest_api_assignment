// Generic Firebase Realtime Database CRUD helpers.
// Each function receives a DatabaseReference (e.g., db.ref('users')).

const getAll = async (ref) => {
  const snap = await ref.get();
  const obj = snap.val() || {};
  return Object.entries(obj).map(([id, item]) => ({ id, ...item }));
};

const create = async (ref, payload) => {
  const newRef = ref.push();
  await newRef.set(payload);
  return { id: newRef.key, ...payload };
};

const getById = async (ref, id) => {
  const snap = await ref.child(id).get();
  if (!snap.exists()) return null;
  return { id, ...snap.val() };
};

const updateById = async (ref, id, updates) => {
  const targetRef = ref.child(id);
  await targetRef.update(updates);
  const updatedSnap = await targetRef.get();
  return { id, ...updatedSnap.val() };
};

const removeById = async (ref, id) => {
  const targetRef = ref.child(id);
  const snap = await targetRef.get();
  if (!snap.exists()) return false;
  await targetRef.remove();
  return true;
};

module.exports = { getAll, create, getById, updateById, removeById };
