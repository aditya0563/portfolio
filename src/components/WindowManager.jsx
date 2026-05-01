import React, { lazy, Suspense, memo } from "react";
import { AnimatePresence } from "framer-motion";
import DraggableWindow from "./DraggableWindow";

// Dynamic App Code Splitting
const CalculatorApp = lazy(() => import("../apps/CalculatorApp"));
const TerminalApp = lazy(() => import("../apps/TerminalApp"));
const LinkedInApp = lazy(() => import("../apps/LinkedInApp"));
const CalendarApp = lazy(() => import("../apps/CalendarApp"));
const SafariApp = lazy(() => import("../apps/SafariApp"));
const YouTubeApp = lazy(() => import("../apps/YouTubeApp"));
const WeatherApp = lazy(() => import("../apps/WeatherApp"));
const GitHubProfile = lazy(() => import("../apps/GitHubProfile"));
const VSCodeApp = lazy(() => import("../apps/VsCode"));
const MapApp = lazy(() => import("../apps/Map"));
const PhotosApp = lazy(() => import("../apps/PhotosApp"));
const NetflixApp = lazy(() => import("../apps/NetflixApp"));
const NotesApp = lazy(() => import("../apps/NotesApp"));
const SpotifyApp = lazy(() => import("../apps/SpotifyApp"));
const Setting = lazy(() => import("../apps/Setting"));
const LeetCodeApp = lazy(() => import("../apps/Leetcode"));
const CodeChefApp = lazy(() => import("../apps/Codechef"));
const IMessageApp = lazy(() => import("../apps/Imessage"));
const ProjectsFolderSection = lazy(() => import("../apps/ProjectsFolderSection"));
const FinderApp = lazy(() => import("../apps/FinderApp"));

// App Loading Fallback inside window frame dynamic for theme
const AppLoader = ({ isDarkMode }) => (
  <div
    className={`w-full h-full flex flex-col items-center justify-center gap-3 transition-colors duration-300 ${
      isDarkMode ? "text-white/50" : "text-zinc-600"
    }`}
  >
    <div
      className={`w-7 h-7 border-2 rounded-full animate-spin ${
        isDarkMode
          ? "border-white/20 border-t-white"
          : "border-black/20 border-t-black"
      }`}
    />
    <span className="text-xs font-medium">Loading app...</span>
  </div>
);

const WindowManager = ({
  windows,
  onClose,
  onMinimize,
  bringWindowToFront,
  getWindowZIndex,
  getCenterPosition,
  isWifiActive,
  setIsWifiActive,
  isBluetooth,
  setIsBluetooth,
  isDarkMode = true,
  finderCategory,
}) => {
  // Theme styling helpers based on isDarkMode
  const defaultBg = isDarkMode ? "bg-black" : "bg-white";
  const defaultHeader = isDarkMode ? "bg-zinc-950/90" : "bg-zinc-100/90";
  const defaultBorder = isDarkMode ? "border-white/10" : "border-black/10";

  const finderBg = isDarkMode ? "bg-[#18181c]" : "bg-slate-50";
  const finderHeader = isDarkMode ? "bg-[#18181c]/90" : "bg-slate-200/90";

  const githubBg = isDarkMode ? "bg-[#0d1117]" : "bg-white";
  const githubHeader = isDarkMode ? "bg-[#161b22]/90" : "bg-gray-100/90";
  const githubBorder = isDarkMode ? "border-[#30363d]" : "border-gray-200";

  const vscodeBg = isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f3f3f3]";
  const vscodeHeader = isDarkMode ? "bg-[#181818]/90" : "bg-[#e8e8e8]/90";
  const vscodeBorder = isDarkMode ? "border-[#333333]" : "border-[#cccccc]";

  const notesBg = isDarkMode ? "bg-[#1e1e1e]" : "bg-[#fbfbfb]";
  const notesHeader = isDarkMode ? "bg-[#141414]/90" : "bg-[#f0f0f0]/90";

  return (
    <>
      {/* Calculator */}
      {windows.calculator?.isOpen && (
        <DraggableWindow
          isOpen={windows.calculator.isOpen}
          isMinimized={windows.calculator.isMinimized}
          onClose={() => onClose("calculator")}
          onMinimize={() => onMinimize("calculator")}
          title="Calculator"
          defaultWidth={50}
          defaultHeight={650}
          {...getCenterPosition(400, 500)}
          zIndex={getWindowZIndex("calculator")}
          onBringToFront={() => bringWindowToFront("calculator")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <CalculatorApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Terminal */}
      {windows.terminal?.isOpen && (
        <DraggableWindow
          isOpen={windows.terminal.isOpen}
          isMinimized={windows.terminal.isMinimized}
          onClose={() => onClose("terminal")}
          onMinimize={() => onMinimize("terminal")}
          title="bikash@macbook-pro:~"
          defaultWidth={600}
          defaultHeight={380}
          {...getCenterPosition(600, 380)}
          zIndex={getWindowZIndex("terminal")}
          onBringToFront={() => bringWindowToFront("terminal")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <TerminalApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* LinkedIn */}
      {windows.linkedin?.isOpen && (
        <DraggableWindow
          isOpen={windows.linkedin.isOpen}
          isMinimized={windows.linkedin.isMinimized}
          onClose={() => onClose("linkedin")}
          onMinimize={() => onMinimize("linkedin")}
          title="LinkedIn Profile"
          defaultWidth={450}
          defaultHeight={550}
          {...getCenterPosition(450, 550)}
          zIndex={getWindowZIndex("linkedin")}
          onBringToFront={() => bringWindowToFront("linkedin")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <LinkedInApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Calendar */}
      {windows.calendar?.isOpen && (
        <DraggableWindow
          isOpen={windows.calendar.isOpen}
          isMinimized={windows.calendar.isMinimized}
          onClose={() => onClose("calendar")}
          onMinimize={() => onMinimize("calendar")}
          title="Calendar"
          defaultWidth={400}
          defaultHeight={520}
          {...getCenterPosition(400, 520)}
          zIndex={getWindowZIndex("calendar")}
          onBringToFront={() => bringWindowToFront("calendar")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <CalendarApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Safari */}
      {windows.safari?.isOpen && (
        <DraggableWindow
          isOpen={windows.safari.isOpen}
          isMinimized={windows.safari.isMinimized}
          onClose={() => onClose("safari")}
          onMinimize={() => onMinimize("safari")}
          title="Safari"
          defaultWidth={800}
          defaultHeight={550}
          {...getCenterPosition(800, 550)}
          zIndex={getWindowZIndex("safari")}
          onBringToFront={() => bringWindowToFront("safari")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <SafariApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* YouTube */}
      {windows.youtube?.isOpen && (
        <DraggableWindow
          isOpen={windows.youtube.isOpen}
          isMinimized={windows.youtube.isMinimized}
          onClose={() => onClose("youtube")}
          onMinimize={() => onMinimize("youtube")}
          title="YouTube"
          defaultWidth={820}
          defaultHeight={560}
          {...getCenterPosition(820, 560)}
          zIndex={getWindowZIndex("youtube")}
          onBringToFront={() => bringWindowToFront("youtube")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <YouTubeApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Weather */}
      {windows.weather?.isOpen && (
        <DraggableWindow
          isOpen={windows.weather.isOpen}
          isMinimized={windows.weather.isMinimized}
          onClose={() => onClose("weather")}
          onMinimize={() => onMinimize("weather")}
          title="Weather"
          defaultWidth={800}
          defaultHeight={550}
          {...getCenterPosition(800, 550)}
          zIndex={getWindowZIndex("weather")}
          onBringToFront={() => bringWindowToFront("weather")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <WeatherApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* GitHub */}
      {windows.github?.isOpen && (
        <DraggableWindow
          isOpen={windows.github.isOpen}
          isMinimized={windows.github.isMinimized}
          onClose={() => onClose("github")}
          onMinimize={() => onMinimize("github")}
          title="GitHub"
          defaultWidth={900}
          defaultHeight={600}
          {...getCenterPosition(900, 600)}
          zIndex={getWindowZIndex("github")}
          onBringToFront={() => bringWindowToFront("github")}
          bgColor={githubBg}
          headerColor={githubHeader}
          borderColor={githubBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <GitHubProfile isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* VSCode */}
      {windows.vscode?.isOpen && (
        <DraggableWindow
          isOpen={windows.vscode.isOpen}
          isMinimized={windows.vscode.isMinimized}
          onClose={() => onClose("vscode")}
          onMinimize={() => onMinimize("vscode")}
          title="Visual Studio Code"
          defaultWidth={1000}
          defaultHeight={650}
          {...getCenterPosition(1000, 650)}
          zIndex={getWindowZIndex("vscode")}
          onBringToFront={() => bringWindowToFront("vscode")}
          bgColor={vscodeBg}
          headerColor={vscodeHeader}
          borderColor={vscodeBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <VSCodeApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Map */}
      {windows.map?.isOpen && (
        <DraggableWindow
          isOpen={windows.map.isOpen}
          isMinimized={windows.map.isMinimized}
          onClose={() => onClose("map")}
          onMinimize={() => onMinimize("map")}
          title="Maps Explorer"
          defaultWidth={950}
          defaultHeight={620}
          {...getCenterPosition(950, 620)}
          zIndex={getWindowZIndex("map")}
          onBringToFront={() => bringWindowToFront("map")}
          bgColor={githubBg}
          headerColor={githubHeader}
          borderColor={githubBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <MapApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Photos */}
      {windows.photos?.isOpen && (
        <DraggableWindow
          isOpen={windows.photos.isOpen}
          isMinimized={windows.photos.isMinimized}
          onClose={() => onClose("photos")}
          onMinimize={() => onMinimize("photos")}
          title="Photos"
          defaultWidth={920}
          defaultHeight={600}
          {...getCenterPosition(920, 600)}
          zIndex={getWindowZIndex("photos")}
          onBringToFront={() => bringWindowToFront("photos")}
          bgColor={githubBg}
          headerColor={githubHeader}
          borderColor={githubBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <PhotosApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Netflix */}
      {windows.netflix?.isOpen && (
        <DraggableWindow
          isOpen={windows.netflix.isOpen}
          isMinimized={windows.netflix.isMinimized}
          onClose={() => onClose("netflix")}
          onMinimize={() => onMinimize("netflix")}
          title="Netflix"
          defaultWidth={980}
          defaultHeight={640}
          {...getCenterPosition(980, 640)}
          zIndex={getWindowZIndex("netflix")}
          onBringToFront={() => bringWindowToFront("netflix")}
          bgColor="bg-[#141414]"
          headerColor="bg-black/90"
          borderColor="border-white/10"
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <NetflixApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Notes */}
      {windows.notes?.isOpen && (
        <DraggableWindow
          isOpen={windows.notes.isOpen}
          isMinimized={windows.notes.isMinimized}
          onClose={() => onClose("notes")}
          onMinimize={() => onMinimize("notes")}
          title="Notes"
          defaultWidth={900}
          defaultHeight={580}
          {...getCenterPosition(900, 580)}
          zIndex={getWindowZIndex("notes")}
          onBringToFront={() => bringWindowToFront("notes")}
          bgColor={notesBg}
          headerColor={notesHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <NotesApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Spotify */}
      {windows.spotify?.isOpen && (
        <DraggableWindow
          isOpen={windows.spotify.isOpen}
          isMinimized={windows.spotify.isMinimized}
          onClose={() => onClose("spotify")}
          onMinimize={() => onMinimize("spotify")}
          title="Spotify"
          defaultWidth={820}
          defaultHeight={560}
          {...getCenterPosition(820, 560)}
          zIndex={getWindowZIndex("spotify")}
          onBringToFront={() => bringWindowToFront("spotify")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <SpotifyApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Settings */}
      {windows.setting?.isOpen && (
        <DraggableWindow
          isOpen={windows.setting.isOpen}
          isMinimized={windows.setting.isMinimized}
          onClose={() => onClose("setting")}
          onMinimize={() => onMinimize("setting")}
          title="System Settings"
          defaultWidth={820}
          defaultHeight={560}
          {...getCenterPosition(820, 560)}
          zIndex={getWindowZIndex("setting")}
          onBringToFront={() => bringWindowToFront("setting")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <Setting
              isWifiActive={isWifiActive}
              setIsWifiActive={setIsWifiActive}
              isBluetooth={isBluetooth}
              setIsBluetooth={setIsBluetooth}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        </DraggableWindow>
      )}

      {/* Resume */}
      {windows.resume?.isOpen && (
        <DraggableWindow
          isOpen={windows.resume.isOpen}
          isMinimized={windows.resume.isMinimized}
          onClose={() => onClose("resume")}
          onMinimize={() => onMinimize("resume")}
          title="Resume.pdf"
          defaultWidth={800}
          defaultHeight={700}
          {...getCenterPosition(800, 700)}
          zIndex={getWindowZIndex("resume")}
          onBringToFront={() => bringWindowToFront("resume")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <iframe
            src="/Resume.pdf"
            className="w-full h-full bg-white border-none"
            title="Resume"
          />
        </DraggableWindow>
      )}

      {/* LeetCode */}
      {windows.leetcode?.isOpen && (
        <DraggableWindow
          isOpen={windows.leetcode.isOpen}
          isMinimized={windows.leetcode.isMinimized}
          onClose={() => onClose("leetcode")}
          onMinimize={() => onMinimize("leetcode")}
          title="LeetCode"
          defaultWidth={800}
          defaultHeight={600}
          {...getCenterPosition(800, 600)}
          zIndex={getWindowZIndex("leetcode")}
          onBringToFront={() => bringWindowToFront("leetcode")}
          bgColor={defaultBg}
          headerColor={defaultHeader}
          borderColor={defaultBorder}
          isDarkMode={isDarkMode}
        >
          <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
            <LeetCodeApp isDarkMode={isDarkMode} />
          </Suspense>
        </DraggableWindow>
      )}

      {/* CodeChef */}
      <AnimatePresence>
        {windows.codechef?.isOpen && (
          <DraggableWindow
            isOpen={windows.codechef.isOpen}
            isMinimized={windows.codechef.isMinimized}
            onClose={() => onClose("codechef")}
            onMinimize={() => onMinimize("codechef")}
            title="CodeChef Arena"
            defaultWidth={1200}
            defaultHeight={700}
            {...getCenterPosition(1200, 700)}
            zIndex={getWindowZIndex("codechef")}
            onBringToFront={() => bringWindowToFront("codechef")}
            bgColor={defaultBg}
            headerColor={defaultHeader}
            borderColor={defaultBorder}
            isDarkMode={isDarkMode}
          >
            <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
              <CodeChefApp isDarkMode={isDarkMode} />
            </Suspense>
          </DraggableWindow>
        )}
      </AnimatePresence>

      {/* iMessage */}
      <AnimatePresence>
        {windows.imessage?.isOpen && (
          <DraggableWindow
            isOpen={windows.imessage.isOpen}
            isMinimized={windows.imessage.isMinimized}
            onClose={() => onClose("imessage")}
            onMinimize={() => onMinimize("imessage")}
            title="iMessage"
            defaultWidth={800}
            defaultHeight={600}
            {...getCenterPosition(800, 600)}
            zIndex={getWindowZIndex("imessage")}
            onBringToFront={() => bringWindowToFront("imessage")}
            bgColor={defaultBg}
            headerColor={defaultHeader}
            borderColor={defaultBorder}
            isDarkMode={isDarkMode}
          >
            <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
              <IMessageApp isDarkMode={isDarkMode} />
            </Suspense>
          </DraggableWindow>
        )}
      </AnimatePresence>

      {/* Projects Folder */}
      <AnimatePresence>
        {windows.projectfolder?.isOpen && (
          <DraggableWindow
            isOpen={windows.projectfolder.isOpen}
            isMinimized={windows.projectfolder.isMinimized}
            onClose={() => onClose("projectfolder")}
            onMinimize={() => onMinimize("projectfolder")}
            title="Finder — Projects Directory"
            defaultWidth={1200}
            defaultHeight={700}
            {...getCenterPosition(1200, 700)}
            zIndex={getWindowZIndex("projectfolder")}
            onBringToFront={() => bringWindowToFront("projectfolder")}
            bgColor={finderBg}
            headerColor={finderHeader}
            borderColor={defaultBorder}
            isDarkMode={isDarkMode}
          >
            <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
              <ProjectsFolderSection isDarkMode={isDarkMode} />
            </Suspense>
          </DraggableWindow>
        )}
      </AnimatePresence>

      {/* Finder */}
      <AnimatePresence>
        {windows.finder?.isOpen && (
          <DraggableWindow
            isOpen={windows.finder.isOpen}
            isMinimized={windows.finder.isMinimized}
            onClose={() => onClose("finder")}
            onMinimize={() => onMinimize("finder")}
            title={
              finderCategory === "bin"
                ? "Finder — Bin"
                : finderCategory === "documents"
                ? "Finder — Documents"
                : "Finder — Recents"
            }
            defaultWidth={1200}
            defaultHeight={700}
            {...getCenterPosition(1200, 700)}
            zIndex={getWindowZIndex("finder")}
            onBringToFront={() => bringWindowToFront("finder")}
            bgColor={finderBg}
            headerColor={finderHeader}
            borderColor={defaultBorder}
            isDarkMode={isDarkMode}
          >
            <Suspense fallback={<AppLoader isDarkMode={isDarkMode} />}>
              <FinderApp
                initialCategory={finderCategory || "documents"}
                isDarkMode={isDarkMode}
              />
            </Suspense>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(WindowManager);