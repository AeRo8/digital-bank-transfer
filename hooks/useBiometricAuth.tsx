import * as LocalAuthentication from "expo-local-authentication";

export const BiometricType = {
  FaceRecognition: "FaceRecognition",
  Fingerprint: "Fingerprint",
  Pin: "Pin",
  None: "None",
};

export default function useBiometricAuth() {
  const getSecurityType = async () => {
    const [authType, securityLevel] = await Promise.all([
      LocalAuthentication.supportedAuthenticationTypesAsync(),
      LocalAuthentication.getEnrolledLevelAsync(),
    ]);

    if (securityLevel === LocalAuthentication.SecurityLevel.BIOMETRIC_STRONG) {
      if (
        authType.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        return BiometricType.FaceRecognition;
      }

      if (
        authType.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      ) {
        return BiometricType.Fingerprint;
      }
    }

    if (securityLevel === LocalAuthentication.SecurityLevel.SECRET) {
      return BiometricType.Pin;
    }

    return BiometricType.None;
  };

  const handleBiometricAuth = async (
    options?: LocalAuthentication.LocalAuthenticationOptions
  ) => {
    try {
      const result = await LocalAuthentication.authenticateAsync(options);

      return result.success;
    } catch (error) {
      console.error("Authenitication failed", error);

      return false;
    }
  };

  return { getSecurityType, handleBiometricAuth };
}
