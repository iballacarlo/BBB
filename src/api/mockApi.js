// Simple frontend-only mock API backed by localStorage
const KEY_USERS = 'mock_users'
const KEY_COMPLAINTS = 'mock_complaints'
const KEY_DOCS = 'mock_docs'

function load(key){
  return JSON.parse(localStorage.getItem(key) || '[]')
}
function save(key, data){
  localStorage.setItem(key, JSON.stringify(data))
}

function seed(){
  if(!localStorage.getItem(KEY_USERS)){
    const users = [
      { id:1, name:'Admin', email:'admin@gmail.com', password:'123', role:'admin' },
      { id:2, name:'Carlo', email:'carlo@gmail.com', password:'123', role:'resident' }
    ]
    save(KEY_USERS, users)
  }
  if(!localStorage.getItem(KEY_COMPLAINTS)) save(KEY_COMPLAINTS, [])
  if(!localStorage.getItem(KEY_DOCS)) save(KEY_DOCS, [])
}

seed()

function findUserByEmail(email){
  const users = load(KEY_USERS)
  return users.find(u=>u.email===email)
}

const api = {
  register(data){
    const users = load(KEY_USERS)
    if(findUserByEmail(data.email)) return { success:false, message:'Email already used' }
    const id = (users[users.length-1]?.id || 0) + 1
    const user = { id, name: data.name || data.email, email: data.email, password: data.password, role: 'resident' }
    users.push(user)
    save(KEY_USERS, users)
    const token = 'tok_'+id
    return { success:true, token, user }
  },
  login(email,password){
    const user = findUserByEmail(email)
    if(!user || user.password !== password) return { success:false, message:'Invalid credentials' }
    const token = 'tok_'+user.id
    return { success:true, token, user }
  },
  getCurrentUser(){
    const token = localStorage.getItem('token')
    if(!token) return null
    const id = parseInt(token.split('_')[1])
    const users = load(KEY_USERS)
    return users.find(u=>u.id===id) || null
  },
  // complaints
  listComplaints(){ return load(KEY_COMPLAINTS) },
  addComplaint(c){
    const list = load(KEY_COMPLAINTS)
    const id = 'C-'+(list.length+1).toString().padStart(4,'0')
    const item = { id, ...c, status:'Submitted', created: new Date().toISOString() }
    list.unshift(item)
    save(KEY_COMPLAINTS, list)
    return item
  },
  // documents
  listDocs(){ return load(KEY_DOCS) },
  addDoc(d){
    const list = load(KEY_DOCS)
    const id = 'D-'+(list.length+1).toString().padStart(4,'0')
    const item = { id, ...d, status:'Submitted', created: new Date().toISOString() }
    list.unshift(item)
    save(KEY_DOCS, list)
    return item
  }
}

export default api
