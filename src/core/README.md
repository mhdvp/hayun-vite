# راهنمای کامل فایل‌های Core

## 📁 فایل‌های موجود در پوشه Core

### 1. **BaseComponent.js** - کلاس پایه کامپوننت‌ها

**چه کاری انجام می‌دهد:**
- کلاس پایه برای ساخت تمام کامپوننت‌های برنامه
- مدیریت چرخه حیات کامپوننت‌ها (mount/unmount)
- مدیریت رویدادها و اشتراک‌گذاری state
- مدیریت کامپوننت‌های فرزند

#### متدهای اصلی:

**constructor(selector, props = {})**
```javascript
class MyComponent extends BaseComponent {
  constructor(selector) {
    super(selector); // selector می‌تواند string یا DOM element باشد
    this.props = props; // props برای انتقال داده به کامپوننت
  }
}
```

**render()**
```javascript
render() {
  // این متد باید در کلاس‌های فرزند override شود
  this.element.innerHTML = '<div>محتوای من</div>';
}
```

**mount()**
```javascript
// کامپوننت را نصب می‌کند
const component = new MyComponent('#app');
component.mount(); // render() و bindEvents() را فراخوانی می‌کند
```

**unmount()**
```javascript
// کامپوننت را حذف می‌کند و حافظه را پاک می‌کند
component.unmount(); // تمام child components و subscriptions را پاک می‌کند
```

**bindEvents()**
```javascript
bindEvents() {
  // اضافه کردن event listeners
  const button = this.element.querySelector('#my-button');
  button.addEventListener('click', () => {
    console.log('دکمه کلیک شد');
  });
}
```

**subscribe(stateKey, callback)**
```javascript
constructor(selector) {
  super(selector);
  
  // اشتراک در تغییرات state
  this.subscribe('patients', (patients) => {
    this.updatePatientList(patients);
  });
}
```

**createChild(ComponentClass, selector, props, key)**
```javascript
// ایجاد کامپوننت فرزند
this.createChild(Header, '#header', { title: 'عنوان' }, 'header-key');

// یا بدون key
this.createChild(Header, '#header', { title: 'عنوان' });
```

**updateChild(key, newProps)**
```javascript
// به‌روزرسانی props کامپوننت فرزند
this.updateChild('header-key', { title: 'عنوان جدید' });
```

**removeChild(key)**
```javascript
// حذف کامپوننت فرزند
this.removeChild('header-key');
```

#### مثال کامل BaseComponent:
```javascript
import { BaseComponent } from './core/BaseComponent.js';

class PatientCard extends BaseComponent {
  constructor(selector, props = {}) {
    super(selector, props);
    this.patient = props.patient;
  }

  render() {
    this.element.innerHTML = `
      <div class="patient-card">
        <h3>${this.patient.name}</h3>
        <p>سن: ${this.patient.age}</p>
        <button id="edit-btn">ویرایش</button>
        <button id="delete-btn">حذف</button>
      </div>
    `;
  }

  bindEvents() {
    const editBtn = this.element.querySelector('#edit-btn');
    const deleteBtn = this.element.querySelector('#delete-btn');

    editBtn.addEventListener('click', () => {
      if (this.props.onEdit) {
        this.props.onEdit(this.patient.id);
      }
    });

    deleteBtn.addEventListener('click', () => {
      if (this.props.onDelete) {
        this.props.onDelete(this.patient.id);
      }
    });
  }
}
```

### 2. **AppState.js** - مدیریت state برنامه

**چه کاری انجام می‌دهد:**
- ذخیره و مدیریت state سراسری برنامه
- اشتراک‌گذاری داده بین کامپوننت‌ها
- اطلاع‌رسانی تغییرات state به کامپوننت‌ها

#### متدهای اصلی:

**setState(key, value)**
```javascript
import { appState } from './core/AppState.js';

// ذخیره یک مقدار
appState.setState('currentUser', { id: 1, name: 'احمد' });
appState.setState('isLoading', true);
appState.setState('patients', [
  { id: 1, name: 'بیمار ۱' },
  { id: 2, name: 'بیمار ۲' }
]);
```

**getState(key)**
```javascript
// دریافت یک مقدار
const user = appState.getState('currentUser');
const isLoading = appState.getState('isLoading');
const patients = appState.getState('patients');
```

**subscribe(key, callback)**
```javascript
// اشتراک در تغییرات
const unsubscribe = appState.subscribe('patients', (newPatients) => {
  console.log('لیست بیماران تغییر کرد:', newPatients);
  this.updatePatientList(newPatients);
});

// لغو اشتراک (مهم!)
unsubscribe();
```

**setStates(updates)**
```javascript
// به‌روزرسانی چندین مقدار همزمان
appState.setStates({
  currentUser: { id: 2, name: 'فاطمه' },
  isLoading: false,
  lastUpdate: new Date()
});
```

#### مثال کامل AppState:
```javascript
import { appState } from './core/AppState.js';

class PatientManager {
  constructor() {
    // اشتراک در تغییرات مختلف
    this.unsubscribers = [
      appState.subscribe('patients', this.handlePatientsChange.bind(this)),
      appState.subscribe('currentPatient', this.handleCurrentPatientChange.bind(this)),
      appState.subscribe('isLoading', this.handleLoadingChange.bind(this))
    ];
  }

  handlePatientsChange(patients) {
    console.log('لیست بیماران به‌روز شد:', patients);
    this.renderPatientList(patients);
  }

  handleCurrentPatientChange(patient) {
    console.log('بیمار فعلی تغییر کرد:', patient);
    this.updatePatientDetails(patient);
  }

  handleLoadingChange(isLoading) {
    console.log('وضعیت بارگذاری:', isLoading);
    this.showLoadingSpinner(isLoading);
  }

  addPatient(patient) {
    const currentPatients = appState.getState('patients') || [];
    const newPatients = [...currentPatients, patient];
    appState.setState('patients', newPatients);
  }

  setCurrentPatient(patientId) {
    const patients = appState.getState('patients') || [];
    const patient = patients.find(p => p.id === patientId);
    appState.setState('currentPatient', patient);
  }

  cleanup() {
    // لغو تمام اشتراک‌ها
    this.unsubscribers.forEach(unsub => unsub());
  }
}
```

### 3. **Router.js** - مدیریت مسیریابی

**چه کاری انجام می‌دهد:**
- مدیریت صفحات مختلف برنامه
- تغییر مسیر بدون بارگذاری مجدد صفحه
- مدیریت دکمه‌های عقب/جلو مرورگر

#### متدهای اصلی:

**setContainer(selector)**
```javascript
import { router } from './core/Router.js';

// تنظیم کانتینر اصلی برای صفحات
router.setContainer('#app');
router.setContainer('.main-content');
```

**addRoute(path, componentClass)**
```javascript
import { HomePage } from './pages/HomePage.js';
import { PatientsPage } from './pages/PatientsPage.js';
import { SessionsPage } from './pages/SessionsPage.js';

// اضافه کردن مسیرها
router.addRoute('/', HomePage);
router.addRoute('/patients', PatientsPage);
router.addRoute('/patients/:id', PatientDetailPage);
router.addRoute('/sessions', SessionsPage);
router.addRoute('/sessions/:id', SessionDetailPage);
```

**navigate(path, state = {})**
```javascript
// تغییر مسیر
router.navigate('/patients');

// تغییر مسیر با state اضافی
router.navigate('/patients/123', { 
  fromPage: 'home',
  timestamp: Date.now() 
});

// استفاده در event handlers
document.getElementById('patients-link').addEventListener('click', () => {
  router.navigate('/patients');
});
```

**init()**
```javascript
// شروع مسیریابی (باید در آخر فراخوانی شود)
router.setContainer('#app')
  .addRoute('/', HomePage)
  .addRoute('/patients', PatientsPage)
  .init();
```

#### مثال کامل Router:
```javascript
import { router } from './core/Router.js';
import { BaseComponent } from './core/BaseComponent.js';

// تعریف صفحات
class HomePage extends BaseComponent {
  render() {
    this.element.innerHTML = `
      <div class="home-page">
        <h1>صفحه اصلی</h1>
        <button onclick="router.navigate('/patients')">مشاهده بیماران</button>
        <button onclick="router.navigate('/sessions')">مشاهده نشست‌ها</button>
      </div>
    `;
  }
}

class PatientsPage extends BaseComponent {
  render() {
    this.element.innerHTML = `
      <div class="patients-page">
        <h1>لیست بیماران</h1>
        <div id="patients-list"></div>
        <button onclick="router.navigate('/')">بازگشت به خانه</button>
      </div>
    `;
    
    // ایجاد کامپوننت لیست بیماران
    this.createChild(PatientList, '#patients-list');
  }
}

class PatientDetailPage extends BaseComponent {
  constructor(selector) {
    super(selector);
    this.patientId = this.extractPatientId();
  }

  extractPatientId() {
    const path = window.location.pathname;
    const match = path.match(/\/patients\/(\d+)/);
    return match ? match[1] : null;
  }

  render() {
    this.element.innerHTML = `
      <div class="patient-detail">
        <h1>جزئیات بیمار ${this.patientId}</h1>
        <div id="patient-info"></div>
        <button onclick="router.navigate('/patients')">بازگشت به لیست</button>
      </div>
    `;
  }
}

// راه‌اندازی router
function initializeApp() {
  router.setContainer('#app')
    .addRoute('/', HomePage)
    .addRoute('/patients', PatientsPage)
    .addRoute('/patients/:id', PatientDetailPage)
    .addRoute('/sessions', SessionsPage)
    .init();
}

// شروع برنامه
document.addEventListener('DOMContentLoaded', initializeApp);
```

## 🔧 نحوه استفاده ترکیبی

### مثال: کامپوننت با Router و AppState
```javascript
import { BaseComponent } from '../core/BaseComponent.js';
import { appState } from '../core/AppState.js';
import { router } from '../core/Router.js';

class PatientList extends BaseComponent {
  constructor(selector) {
    super(selector);
    
    // اشتراک در تغییرات patients
    this.subscribe('patients', (patients) => {
      this.renderPatients(patients);
    });
  }

  render() {
    this.element.innerHTML = '<div id="patients-container"></div>';
  }

  bindEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('patient-item')) {
        const patientId = e.target.dataset.patientId;
        this.selectPatient(patientId);
      }
    });
  }

  renderPatients(patients) {
    const container = this.element.querySelector('#patients-container');
    container.innerHTML = patients.map(patient => `
      <div class="patient-item" data-patient-id="${patient.id}">
        <h3>${patient.name}</h3>
        <p>سن: ${patient.age}</p>
      </div>
    `).join('');
  }

  selectPatient(patientId) {
    // ذخیره در state
    appState.setState('currentPatientId', patientId);
    
    // تغییر مسیر
    router.navigate(`/patients/${patientId}`);
  }
}
```

## 📝 نکات مهم و بهترین شیوه‌ها:

### BaseComponent:
- همیشه `render()` و `bindEvents()` را override کنید
- از `createChild()` برای مدیریت کامپوننت‌های فرزند استفاده کنید
- همیشه `unmount()` را فراخوانی کنید تا از نشت حافظه جلوگیری کنید

### AppState:
- همیشه `unsubscribe` کنید
- از `setStates()` برای به‌روزرسانی چندین مقدار استفاده کنید
- state را در کامپوننت‌های کوچک نگه دارید

### Router:
- `init()` را فقط یک بار فراخوانی کنید
- از state برای انتقال داده بین صفحات استفاده کنید
- مسیرهای 404 را مدیریت کنید

### مدیریت حافظه:
```javascript
class MyComponent extends BaseComponent {
  constructor(selector) {
    super(selector);
    
    // اشتراک‌ها را ذخیره کنید
    this.subscriptions = [
      this.subscribe('data1', this.handleData1.bind(this)),
      this.subscribe('data2', this.handleData2.bind(this))
    ];
  }

  unmount() {
    // لغو اشتراک‌ها
    this.subscriptions.forEach(unsub => unsub());
    super.unmount();
  }
}
```

## 🚀 مثال عملی: سیستم مدیریت بیماران

```javascript
// main.js
import { BaseComponent } from './core/BaseComponent.js';
import { appState } from './core/AppState.js';
import { router } from './core/Router.js';
import { Header, Patients, Sessions } from './components/index.js';

class App extends BaseComponent {
  constructor(selector) {
    super(selector);
    this.components = {};
  }

  render() {
    this.element.innerHTML = `
      <div class="app">
        <div id="header"></div>
        <div class="main-content">
          <div id="sessions-sidebar"></div>
          <div id="patients-content"></div>
        </div>
      </div>
    `;
  }

  mount() {
    super.mount();
    this.initializeComponents();
    this.initializeState();
  }

  initializeComponents() {
    // ایجاد کامپوننت‌ها
    this.components.header = this.createChild(Header, '#header', {
      onNewPatient: this.handleNewPatient.bind(this)
    });

    this.components.sessions = this.createChild(Sessions, '#sessions-sidebar', {
      onNewSession: this.handleNewSession.bind(this),
      onDeleteSession: this.handleDeleteSession.bind(this)
    });

    this.components.patients = this.createChild(Patients, '#patients-content', {
      onEditPatient: this.handleEditPatient.bind(this),
      onDeletePatient: this.handleDeletePatient.bind(this)
    });
  }

  initializeState() {
    // مقداردهی اولیه state
    appState.setStates({
      patients: [
        { id: 1, name: 'احمد محمدی', age: 35, sessions: 3 },
        { id: 2, name: 'فاطمه احمدی', age: 28, sessions: 1 }
      ],
      currentPatient: null,
      isLoading: false
    });
  }

  // Event handlers
  handleNewPatient() {
    const newPatient = {
      id: Date.now(),
      name: 'بیمار جدید',
      age: 0,
      sessions: 0
    };
    
    const patients = appState.getState('patients');
    appState.setState('patients', [...patients, newPatient]);
  }

  handleEditPatient(patientId) {
    appState.setState('currentPatient', patientId);
    router.navigate(`/patients/${patientId}/edit`);
  }

  handleDeletePatient(patientId) {
    if (confirm('آیا از حذف این بیمار اطمینان دارید؟')) {
      const patients = appState.getState('patients');
      const filteredPatients = patients.filter(p => p.id !== patientId);
      appState.setState('patients', filteredPatients);
    }
  }

  handleNewSession() {
    const currentPatient = appState.getState('currentPatient');
    if (currentPatient) {
      const newSession = {
        id: Date.now(),
        patientId: currentPatient,
        date: new Date().toLocaleDateString('fa-IR'),
        notes: ''
      };
      
      // اضافه کردن نشست به state
      const sessions = appState.getState('sessions') || [];
      appState.setState('sessions', [...sessions, newSession]);
    }
  }

  handleDeleteSession(sessionId) {
    if (confirm('آیا از حذف این نشست اطمینان دارید؟')) {
      const sessions = appState.getState('sessions');
      const filteredSessions = sessions.filter(s => s.id !== sessionId);
      appState.setState('sessions', filteredSessions);
    }
  }
}

// راه‌اندازی برنامه
const app = new App('#app');
document.addEventListener('DOMContentLoaded', () => {
  app.mount();
});
``` 