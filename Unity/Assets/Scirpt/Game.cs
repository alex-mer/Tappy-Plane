using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Game : MonoBehaviour {
    public GameObject[] startScreen;
    public GameObject plane;
    public GameObject score;
    public GameObject topScore;
    public GameObject rockTop;
    public GameObject rockBottom;
    public AudioClip tapAudioClip;
    public AudioClip crashAudioClip;

    void Start() {
        Config config = new Config();
    }

    void Update() {
        if (Config.state == "game") {
            if(rockTop.transform.position.x.ToString("0.0") == "0,0") {
                score.GetComponent<Score>().updateScore();
            }

            if (Input.GetMouseButtonUp(0)) {
                plane.GetComponent<Plane>().onTap();
            }
        } else {
            if (Input.GetMouseButtonUp(0)) {
                _startGame();
            }
        }

        if (Input.GetMouseButtonUp(0)) {
            GetComponent<AudioSource>().PlayOneShot(tapAudioClip, 3);
        }
    }

    public void endGame() {
        Config.state = "end";
        score.SetActive(false);
        topScore.SetActive(true);

        topScore.GetComponent<Text>().text = "Top score:" + score.GetComponent<Score>().getTopScore().ToString();

        plane.GetComponent<Rigidbody2D>().simulated = false;
        plane.GetComponent<Rigidbody2D>().velocity = new Vector2(0f, 0f);
        plane.transform.position = new Vector3(0, 0, plane.transform.position.z);

        rockTop.GetComponent<Rock>().toStart();
        rockBottom.GetComponent<Rock>().toStart();

        GetComponent<AudioSource>().PlayOneShot(crashAudioClip);

        _animation(startScreen, 1f);
        _vibration();
    }

    private void _startGame() {
        Config.state = "game";
        score.SetActive(true);
        topScore.SetActive(false);
        score.GetComponent<Score>().Start();
        plane.GetComponent<Rigidbody2D>().simulated = true;
        _animation(startScreen, 0f);
    }

    private void _animation(GameObject []objects, float alpha) {
        foreach (GameObject i in objects) {
            iTween.ColorTo(i, iTween.Hash("a", alpha, "time", 0.3f));
        }
    }

    private void _vibration() {
        iTween.MoveTo(gameObject, iTween.Hash("x", 2.5f, "delay", 0f));
        iTween.MoveTo(gameObject, iTween.Hash("x", -2.5f, "delay", 0.1f));
        iTween.MoveTo(gameObject, iTween.Hash("x", 0f, "delay", 0.2f));
    }
}
