import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { doc, getDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [todosCount, setTodosCount] = useState(0);

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      navigate("/auth");
      return;
    }

    // Fetch user data
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEditName(data.name || "");
        } else {
          const defaultData = {
            name: "User",
            email: auth.currentUser?.email,
            createdAt: new Date().toISOString(),
            todosCount: 0
          };
          setUserData(defaultData);
          setEditName(defaultData.name);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();

    // Listen to todos count
    const todosRef = collection(db, "users", uid, "todos");
    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      setTodosCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSaveName = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid || !editName.trim()) return;

    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { name: editName.trim() });
      setUserData({ ...userData, name: editName.trim() });
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating name:", error);
    }
  };

  if (!userData) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="rounded-circle bg-white bg-opacity-20 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-person-fill fs-1"></i>
                </div>
                <h2 className="card-title fw-bold">Welcome back!</h2>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="bg-white bg-opacity-10 rounded p-3">
                    <h6 className="mb-2">Name</h6>
                    {isEditing ? (
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                        />
                        <button className="btn btn-sm btn-success" onClick={handleSaveName}>
                          <i className="bi bi-check"></i>
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">{userData.name}</span>
                        <button className="btn btn-sm btn-outline-light" onClick={() => setIsEditing(true)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bg-white bg-opacity-10 rounded p-3">
                    <h6 className="mb-2">Email</h6>
                    <span className="fw-semibold">{userData.email}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bg-white bg-opacity-10 rounded p-3">
                    <h6 className="mb-2">Member Since</h6>
                    <span className="fw-semibold">
                      {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bg-white bg-opacity-10 rounded p-3">
                    <h6 className="mb-2">Total Todos</h6>
                    <span className="fw-semibold">{todosCount}</span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  className="btn btn-light btn-lg me-3"
                  onClick={() => navigate('/todos')}
                >
                  <i className="bi bi-list-check me-2"></i>View Todos
                </button>
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => navigate('/')}
                >
                  <i className="bi bi-house me-2"></i>Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
