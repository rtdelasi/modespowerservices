// admin.js - Administrative Dashboard Logic for Modes Power Services

// Track current view tab and edit item states
let activeTab = 'projectsTab';
let currentProjectImageFile = null;
let currentGalleryImageFile = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// App initialization logic
async function initApp() {
  showLoading(true);
  
  const config = getSupabaseConfig();
  if (!config.url || !config.key) {
    showLoading(false);
    showScreen('setupScreen');
    return;
  }
  
  const client = getSupabaseClient();
  if (!client) {
    showLoading(false);
    showToast("Failed to initialize database client. Please verify credentials.", "error");
    showScreen('setupScreen');
    return;
  }

  // Pre-fill read-only inputs in Settings tab
  document.getElementById("settingsUrl").value = config.url;
  document.getElementById("settingsKey").value = config.key;

  try {
    // Check active session
    const { data: { session }, error } = await client.auth.getSession();
    
    if (error) throw error;
    
    if (session) {
      showScreen('dashboardLayout');
      loadDashboardData();
    } else {
      showScreen('authScreen');
    }
  } catch (err) {
    console.error("Auth check failed:", err);
    showScreen('authScreen');
  } finally {
    showLoading(false);
  }
}

// Show/Hide Screens
function showScreen(screenId) {
  const screens = ['setupScreen', 'authScreen', 'dashboardLayout'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (id === screenId) ? (id === 'dashboardLayout' ? 'flex' : 'block') : 'none';
  });
}

function showLoading(show) {
  const loader = document.getElementById("loadingScreen");
  if (loader) {
    if (show) loader.classList.remove("hidden");
    else loader.classList.add("hidden");
  }
}

// Show Setup Configuration Screen
function showSetupScreen() {
  const config = getSupabaseConfig();
  document.getElementById("setupUrl").value = config.url || "";
  document.getElementById("setupKey").value = config.key || "";
  showScreen('setupScreen');
}

// Save Setup Configuration Settings
function handleSetup(e) {
  e.preventDefault();
  const url = document.getElementById("setupUrl").value.trim();
  const key = document.getElementById("setupKey").value.trim();
  
  saveSupabaseConfig(url, key);
  
  // Re-initialize client
  supabaseClient = null;
  const client = getSupabaseClient();
  
  if (client) {
    showToast("Supabase configuration saved successfully!", "success");
    initApp();
  } else {
    showToast("Failed to connect. Please review your settings.", "error");
  }
}

// Authenticate Administrator Login
async function handleLogin(e) {
  e.preventDefault();
  showLoading(true);
  
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const client = getSupabaseClient();
  
  if (!client) {
    showLoading(false);
    showToast("Database client connection is not configured.", "error");
    return;
  }
  
  try {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    
    if (error) throw error;
    
    showToast(`Welcome back, ${data.user.email}!`, "success");
    showScreen('dashboardLayout');
    loadDashboardData();
  } catch (err) {
    console.error("Login error:", err);
    showToast(err.message || "Login failed. Check credentials and try again.", "error");
  } finally {
    showLoading(false);
  }
}

// Log Out Administrator
async function handleLogout() {
  showLoading(true);
  const client = getSupabaseClient();
  
  if (client) {
    await client.auth.signOut();
  }
  
  showToast("Logged out successfully.", "info");
  showScreen('authScreen');
  showLoading(false);
}

// Check if tables exist in the user's Supabase instance
async function checkTableSchemas() {
  const btn = document.getElementById("checkSchemaBtn");
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Checking...`;
  
  const client = getSupabaseClient();
  let errors = [];
  
  try {
    // Check projects table
    const { error: projErr } = await client.from('projects').select('id').limit(1);
    if (projErr) errors.push(`Projects table issue: ${projErr.message}`);
    
    // Check gallery table
    const { error: gallErr } = await client.from('gallery').select('id').limit(1);
    if (gallErr) errors.push(`Gallery table issue: ${gallErr.message}`);
    
    if (errors.length === 0) {
      showToast("All database tables are correctly configured!", "success");
    } else {
      showToast("Schema warning: " + errors.join("; "), "error");
    }
  } catch (err) {
    showToast("Table checking failed: " + err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-database"></i> Check Tables Setup`;
  }
}

// Tab Switching
function switchTab(tabId) {
  activeTab = tabId;
  const tabs = ['projectsTab', 'galleryTab', 'settingsTab'];
  tabs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", id === tabId);
  });
  
  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach(tab => {
    const isClicked = tab.getAttribute("onclick").includes(tabId);
    tab.classList.toggle("active", isClicked);
  });
}

// Load dynamic data based on active tab
function loadDashboardData() {
  loadProjects();
  loadGallery();
}

// ==========================================
// PROJECTS CRUD OPERATIONS
// ==========================================

async function loadProjects() {
  const client = getSupabaseClient();
  const grid = document.getElementById("projectsGrid");
  if (!client || !grid) return;
  
  grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><i class="fa-solid fa-circle-notch fa-spin fa-2x" style="color:var(--primary);"></i><p style="margin-top:10px; color:var(--text-muted);">Fetching projects...</p></div>`;
  
  try {
    const { data: projects, error } = await client
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    grid.innerHTML = "";
    
    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-folder-open empty-icon"></i>
          <h3 class="empty-title">No Projects Found</h3>
          <p class="empty-desc">Get started by creating your first portfolio entry. It will immediately show up on your website's projects section.</p>
          <button class="btn" onclick="openProjectModal()">
            <i class="fa-solid fa-plus"></i> Add Project
          </button>
        </div>
      `;
      return;
    }
    
    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "admin-card";
      
      const imageUrl = p.image_url || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80";
      
      card.innerHTML = `
        <div class="card-img-wrap">
          <img src="${imageUrl}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'">
        </div>
        <div class="card-body">
          <span class="card-tag">${p.category}</span>
          <h3 class="card-title">${p.title}</h3>
          <div class="card-meta">
            <span><i class="fa-solid fa-calendar"></i> ${p.date || 'N/A'}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${p.location || 'N/A'}</span>
          </div>
          <p class="card-desc">${p.description || 'No description provided.'}</p>
          <div class="card-actions">
            <button class="btn" style="background: var(--primary);" onclick='editProject(${JSON.stringify(p).replace(/'/g, "&apos;")})'>
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="btn btn-danger" onclick="deleteProject(${p.id}, '${p.image_url}')">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load projects:", err);
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 40px; color:var(--danger);"><i class="fa-solid fa-triangle-exclamation fa-2x"></i><p style="margin-top:10px;">Error loading projects: ${err.message}</p></div>`;
  }
}

// Open modal for new project
function openProjectModal() {
  document.getElementById("projectModalTitle").innerText = "Add Portfolio Project";
  document.getElementById("projectId").value = "";
  document.getElementById("projectForm").reset();
  resetImageUpload('projectFileInput', 'projectPreviewImg', 'projectDragArea');
  document.getElementById("projectModalOverlay").classList.add("active");
}

function closeProjectModal() {
  document.getElementById("projectModalOverlay").classList.remove("active");
}

// Edit project
function editProject(p) {
  document.getElementById("projectModalTitle").innerText = "Edit Portfolio Project";
  document.getElementById("projectId").value = p.id;
  document.getElementById("projectTitle").value = p.title || "";
  document.getElementById("projectCategory").value = p.category || "Industrial";
  document.getElementById("projectDate").value = p.date || "";
  document.getElementById("projectLocation").value = p.location || "";
  document.getElementById("projectDescription").value = p.description || "";
  document.getElementById("projectImageUrl").value = p.image_url || "";
  
  if (p.image_url) {
    const preview = document.getElementById("projectPreviewImg");
    preview.src = p.image_url;
    document.getElementById("projectDragArea").style.display = "none";
    document.getElementById("projectPreviewWrapper").style.display = "block";
  } else {
    resetImageUpload('projectFileInput', 'projectPreviewImg', 'projectDragArea');
  }
  
  document.getElementById("projectModalOverlay").classList.add("active");
}

// Save Project (Insert or Update)
async function saveProject(e) {
  e.preventDefault();
  showLoading(true);
  
  const id = document.getElementById("projectId").value;
  const title = document.getElementById("projectTitle").value.trim();
  const category = document.getElementById("projectCategory").value;
  const date = document.getElementById("projectDate").value.trim();
  const location = document.getElementById("projectLocation").value.trim();
  const description = document.getElementById("projectDescription").value.trim();
  let imageUrl = document.getElementById("projectImageUrl").value.trim();
  
  const client = getSupabaseClient();
  if (!client) {
    showLoading(false);
    return;
  }
  
  try {
    // If a new local file is selected for upload, upload it to bucket
    if (currentProjectImageFile) {
      imageUrl = await uploadImage(currentProjectImageFile);
    }
    
    if (!imageUrl) {
      throw new Error("An image is required. Please upload one or enter a link.");
    }
    
    const projectData = {
      title,
      category,
      date,
      location,
      description,
      image_url: imageUrl
    };
    
    let resultError;
    if (id) {
      // Update
      const { error } = await client.from('projects').update(projectData).eq('id', id);
      resultError = error;
    } else {
      // Insert
      const { error } = await client.from('projects').insert([projectData]);
      resultError = error;
    }
    
    if (resultError) throw resultError;
    
    showToast(id ? "Project updated successfully!" : "New project added successfully!", "success");
    closeProjectModal();
    loadProjects();
  } catch (err) {
    console.error("Save project failed:", err);
    showToast("Error saving project: " + err.message, "error");
  } finally {
    showLoading(false);
  }
}

// Delete Project
async function deleteProject(id, imageUrl) {
  if (!confirm("Are you sure you want to permanently delete this project?")) return;
  
  showLoading(true);
  const client = getSupabaseClient();
  
  try {
    const { error } = await client.from('projects').delete().eq('id', id);
    if (error) throw error;
    
    // Attempt to delete image from bucket if it's stored in Supabase
    if (imageUrl && imageUrl.includes("/storage/v1/object/public/images/")) {
      const filename = imageUrl.split("/").pop();
      await client.storage.from("images").remove([filename]);
    }
    
    showToast("Project deleted successfully.", "success");
    loadProjects();
  } catch (err) {
    console.error("Failed to delete project:", err);
    showToast("Delete failed: " + err.message, "error");
  } finally {
    showLoading(false);
  }
}

// ==========================================
// GALLERY CRUD OPERATIONS
// ==========================================

async function loadGallery() {
  const client = getSupabaseClient();
  const grid = document.getElementById("galleryGrid");
  if (!client || !grid) return;
  
  grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><i class="fa-solid fa-circle-notch fa-spin fa-2x" style="color:var(--primary);"></i><p style="margin-top:10px; color:var(--text-muted);">Fetching gallery...</p></div>`;
  
  try {
    const { data: gallery, error } = await client
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    grid.innerHTML = "";
    
    if (gallery.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-images empty-icon"></i>
          <h3 class="empty-title">No Gallery Photos</h3>
          <p class="empty-desc">Create grid entries to populate your website's galleries instantly.</p>
          <button class="btn" onclick="openGalleryModal()">
            <i class="fa-solid fa-plus"></i> Add Gallery Item
          </button>
        </div>
      `;
      return;
    }
    
    gallery.forEach(item => {
      const card = document.createElement("div");
      card.className = "admin-card";
      
      const humanCategory = {
        'team': 'Team & Training',
        'equipment': 'Equipment & Testing',
        'site': 'On-Site Installations'
      }[item.category] || item.category;
      
      card.innerHTML = `
        <div class="card-img-wrap">
          <img src="${item.image_url}" alt="${item.title || 'Gallery Item'}" onerror="this.src='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'">
        </div>
        <div class="card-body">
          <span class="card-tag">${humanCategory}</span>
          <h3 class="card-title">${item.title || 'Untitled Grid Photo'}</h3>
          <div class="card-actions" style="margin-top: 15px;">
            <button class="btn btn-danger" style="width: 100%;" onclick="deleteGalleryItem(${item.id}, '${item.image_url}')">
              <i class="fa-solid fa-trash-can"></i> Delete Photo
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding: 40px; color:var(--danger);"><i class="fa-solid fa-triangle-exclamation fa-2x"></i><p style="margin-top:10px;">Error loading gallery: ${err.message}</p></div>`;
  }
}

// Modal controllers
function openGalleryModal() {
  document.getElementById("galleryModalTitle").innerText = "Add Gallery Photo";
  document.getElementById("galleryForm").reset();
  resetImageUpload('galleryFileInput', 'galleryPreviewImg', 'galleryDragArea');
  document.getElementById("galleryModalOverlay").classList.add("active");
}

function closeGalleryModal() {
  document.getElementById("galleryModalOverlay").classList.remove("active");
}

// Save Gallery Item
async function saveGalleryItem(e) {
  e.preventDefault();
  showLoading(true);
  
  const title = document.getElementById("galleryTitle").value.trim();
  const category = document.getElementById("galleryCategory").value;
  let imageUrl = document.getElementById("galleryImageUrl").value.trim();
  
  const client = getSupabaseClient();
  if (!client) {
    showLoading(false);
    return;
  }
  
  try {
    if (currentGalleryImageFile) {
      imageUrl = await uploadImage(currentGalleryImageFile);
    }
    
    if (!imageUrl) {
      throw new Error("An image is required. Please upload a file or enter a link.");
    }
    
    const galleryData = {
      title,
      category,
      image_url: imageUrl
    };
    
    const { error } = await client.from('gallery').insert([galleryData]);
    if (error) throw error;
    
    showToast("Gallery item added successfully!", "success");
    closeGalleryModal();
    loadGallery();
  } catch (err) {
    console.error("Failed to add gallery item:", err);
    showToast("Error adding item: " + err.message, "error");
  } finally {
    showLoading(false);
  }
}

// Delete Gallery Item
async function deleteGalleryItem(id, imageUrl) {
  if (!confirm("Are you sure you want to delete this gallery item?")) return;
  
  showLoading(true);
  const client = getSupabaseClient();
  
  try {
    const { error } = await client.from('gallery').delete().eq('id', id);
    if (error) throw error;
    
    // Delete image from storage if hosted in Supabase
    if (imageUrl && imageUrl.includes("/storage/v1/object/public/images/")) {
      const filename = imageUrl.split("/").pop();
      await client.storage.from("images").remove([filename]);
    }
    
    showToast("Gallery item removed successfully.", "success");
    loadGallery();
  } catch (err) {
    console.error("Failed to delete gallery item:", err);
    showToast("Delete failed: " + err.message, "error");
  } finally {
    showLoading(false);
  }
}

// ==========================================
// IMAGE UPLOAD UTILITIES
// ==========================================

// Uploads file to Supabase storage 'images' bucket
async function uploadImage(file) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Database client not connected.");
  
  // Clean filename to be URL-safe
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filename = `${Date.now()}-${cleanName}`;
  
  try {
    // Attempt upload
    const { data, error } = await client.storage
      .from('images')
      .upload(filename, file, { cacheControl: '3600', upsert: false });
      
    if (error) {
      // If bucket does not exist, hint bucket setup
      if (error.message.includes("Bucket not found")) {
        throw new Error("Supabase Storage bucket named 'images' is missing. Please create a public bucket named 'images' in your Supabase dashboard or paste an external image URL in the link input below instead.");
      }
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = client.storage.from('images').getPublicUrl(filename);
    return publicUrl;
  } catch (err) {
    console.error("Storage upload failed:", err);
    throw err;
  }
}

// Drag & drop file trigger helper
function triggerFileInput(inputId) {
  document.getElementById(inputId).click();
}

// Local image previewer
function previewImage(input, previewImgId, dragAreaId) {
  const file = input.files[0];
  if (!file) return;
  
  // Set files into global vars for processing
  if (input.id === 'projectFileInput') {
    currentProjectImageFile = file;
    document.getElementById("projectImageUrl").value = ""; // Clear url
  } else if (input.id === 'galleryFileInput') {
    currentGalleryImageFile = file;
    document.getElementById("galleryImageUrl").value = ""; // Clear url
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById(previewImgId);
    preview.src = e.target.result;
    
    document.getElementById(dragAreaId).style.display = "none";
    preview.parentElement.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// Input image URL manual handler
function handleImageUrlInput(input, previewImgId, dragAreaId, wrapperId) {
  const url = input.value.trim();
  const preview = document.getElementById(previewImgId);
  const dragArea = document.getElementById(dragAreaId);
  const wrapper = document.getElementById(wrapperId);
  
  if (input.id === 'projectImageUrl') {
    currentProjectImageFile = null;
    document.getElementById("projectFileInput").value = "";
  } else if (input.id === 'galleryImageUrl') {
    currentGalleryImageFile = null;
    document.getElementById("galleryFileInput").value = "";
  }
  
  if (url) {
    preview.src = url;
    dragArea.style.display = "none";
    wrapper.style.display = "block";
  } else {
    dragArea.style.display = "block";
    wrapper.style.display = "none";
    preview.src = "";
  }
}

// Reset fields
function resetImageUpload(inputId, previewImgId, dragAreaId) {
  document.getElementById(inputId).value = "";
  const preview = document.getElementById(previewImgId);
  preview.src = "";
  
  document.getElementById(dragAreaId).style.display = "block";
  preview.parentElement.style.display = "none";
  
  if (inputId === 'projectFileInput') {
    currentProjectImageFile = null;
    document.getElementById("projectImageUrl").value = "";
  } else if (inputId === 'galleryFileInput') {
    currentGalleryImageFile = null;
    document.getElementById("galleryImageUrl").value = "";
  }
}

// Drag & drop listeners
const dragAreas = ['projectDragArea', 'galleryDragArea'];
dragAreas.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  
  ['dragenter', 'dragover'].forEach(eventName => {
    el.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.classList.add('dragover');
    }, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    el.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.classList.remove('dragover');
    }, false);
  });
  
  el.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      const inputId = id === 'projectDragArea' ? 'projectFileInput' : 'galleryFileInput';
      const input = document.getElementById(inputId);
      input.files = files;
      const previewImgId = id === 'projectDragArea' ? 'projectPreviewImg' : 'galleryPreviewImg';
      previewImage(input, previewImgId, id);
    }
  }, false);
});

// Modal dismiss helper when clicking outside
function closeModalOnOverlay(e, overlayId) {
  if (e.target.id === overlayId) {
    if (overlayId === 'projectModalOverlay') closeProjectModal();
    else if (overlayId === 'galleryModalOverlay') closeGalleryModal();
  }
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "info-circle";
  if (type === "success") icon = "circle-check";
  else if (type === "error") icon = "triangle-exclamation";
  
  toast.innerHTML = `
    <i class="fa-solid fa-${icon}"></i>
    <div>${message}</div>
  `;
  
  container.appendChild(toast);
  
  // Slide out and remove toast after 4s
  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s reverse forwards";
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 4000);
}
