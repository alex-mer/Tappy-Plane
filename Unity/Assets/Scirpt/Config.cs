public class Config {
   public static Config getInstance() {
        if (Config._instance == null) {
            Config._instance = new Config();
        }

        return Config._instance;
    }

    public static string state = "start";
    private static Config _instance;
}
