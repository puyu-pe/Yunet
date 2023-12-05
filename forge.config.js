module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        authors: "PUYU SRL",
        iconUrl: "https://puyu.pe/favicon.ico",
        exe: "YuNet.exe",
        name: "YuNet",
      },
    },
    {
      // Para macOS
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "assets/icon.icns",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          bin: "YuNet",
          maintainer: "PUYU",
          homepage: "https://puyu.pe",
          icon: "assets/icon.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
					icon: 'assets/icon.png'
				},
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
