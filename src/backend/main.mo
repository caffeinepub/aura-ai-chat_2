import OutCall "http-outcalls/outcall";
import Runtime "mo:core/Runtime";

actor {
  let OPENAI_API_KEY = "OPENAI_API_KEY";
  let OPENAI_URL = "https://api.openai.com/v1/chat/completions";

  public query func transform(input: OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func getOpenAiHeaders() : [OutCall.Header] {
    [
      {
        name = "Content-Type";
        value = "application/json.1";
      },
      {
        name = "Authorization";
        value = "Bearer " # OPENAI_API_KEY;
      },
    ];
  };

  func createRequestBody(prompt: Text, history : Text) : Text {
    let userMessage = "{\"role\": \"user\", \"content\": \"" # prompt # "\"}";
    "{ \"model\": \"gpt-3.5-turbo\", \"messages\": [" # history # userMessage # "] }";
  };

  public shared ({ caller }) func chat(prompt : Text, history : Text) : async Text {
    let body = createRequestBody(prompt, history);
    let headers = getOpenAiHeaders();
    await OutCall.httpPostRequest(OPENAI_URL, headers, body, transform);
  };
};
