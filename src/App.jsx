import { lazy, Suspense, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useSettings } from './hooks/useSettings'
import { useProjects } from './hooks/useProjects'

import Nav from './components/Nav'
import DaySheet from './components/DaySheet'
import ProjectForm from './components/ProjectForm'
import { Spinner } from './components/ui'

import Login from './screens/Login'
import Calendar from './screens/Calendar'
import Dashboard from './screens/Dashboard'
import Find from './screens/Find'
import SettingsScreen from './screens/SettingsScreen'

// Reports pulls in the charting library, which is large and only needed on
// one screen. Loading it separately keeps the calendar fast to open.
const Reports = lazy(() => import('./screens/Reports'))

/**
 * The shell.
 *
 * This file owns three things and nothing else: which tab is showing,
 * which day sheet is open, and which project is being edited. All data
 * lives in the hooks; all appearance lives in the screens. Keeping this
 * file thin is what makes new features cheap to add later.
 */
export default function App() {
  const { user, loading: loadingAuth } = useAuth()
  const { settings, saveSettings, loadingSettings } = useSettings(user?.id)
  const {
    projects, byDate, loading: loadingProjects, error,
    addProject, updateProject, deleteProject, markPeriodPaid,
  } = useProjects(user?.id)

  const [tab, setTab] = useState('calendar')
  const [dayKey, setDayKey] = useState(null)      // which date sheet is open
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)    // project being edited, or null

  const busy = loadingAuth || (user && (loadingSettings || loadingProjects))

  return (
    <div className="mx-auto w-full max-w-[440px] min-h-full flex flex-col relative overflow-hidden bg-bg">
      {loadingAuth ? (
        <Spinner />
      ) : !user ? (
        <Login />
      ) : busy ? (
        <Spinner />
      ) : (
        <>
          {error && (
            <div className="mx-[18px] mt-3 p-3 rounded-[10px] bg-red-500/10
              border border-red-500/30 text-[12px] text-red-300">
              {error}
            </div>
          )}

          {tab === 'calendar' && (
            <Calendar
              byDate={byDate} projects={projects} settings={settings}
              onSelectDate={setDayKey}
            />
          )}

          {tab === 'dashboard' && (
            <Dashboard
              projects={projects} settings={settings} onMarkPaid={markPeriodPaid}
            />
          )}

          {tab === 'reports' && (
            <Suspense fallback={<Spinner />}>
              <Reports projects={projects} settings={settings} />
            </Suspense>
          )}

          {tab === 'find' && (
            <Find
              projects={projects} settings={settings}
              onEdit={(p) => { setEditing(p); setFormOpen(true) }}
            />
          )}

          {tab === 'settings' && (
            <SettingsScreen
              user={user} settings={settings}
              saveSettings={saveSettings} projects={projects}
            />
          )}

          <Nav tab={tab} setTab={(t) => { setDayKey(null); setTab(t) }} />

          <DaySheet
            dateKey={dayKey}
            projects={dayKey ? byDate.get(dayKey) : []}
            settings={settings}
            onClose={() => setDayKey(null)}
            onQuickAdd={() =>
              addProject({
                name: 'Descript project',
                amount: settings.default_rate,
                completed_on: dayKey,
                status: 'completed',
                paid: false,
              })
            }
            onOpenForm={() => { setEditing(null); setFormOpen(true) }}
            onEdit={(p) => { setEditing(p); setFormOpen(true) }}
          />

          <ProjectForm
            open={formOpen}
            project={editing}
            defaultDate={dayKey ?? new Date().toISOString().slice(0, 10)}
            settings={settings}
            onSave={(fields) =>
              editing ? updateProject(editing.id, fields) : addProject(fields)
            }
            onDelete={deleteProject}
            onClose={() => { setFormOpen(false); setEditing(null) }}
          />
        </>
      )}
    </div>
  )
}
