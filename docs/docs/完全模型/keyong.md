

可用，但是识别不出来模型

```plain

#include "../include/common.hpp"     //公共类方法文件
#include "../include/detection.hpp"  //百度Paddle框架移动端部署
#include "../include/uart.hpp"       //串口通信驱动
#include "controlcenter.cpp"         //控制中心计算类
#include "detection/bridge.cpp"      //AI检测：坡道区
#include "detection/danger.cpp"      //AI检测：危险区
#include "detection/parking.cpp"     //AI检测：停车区
#include "detection/racing.cpp"      //AI检测：追逐区
#include "detection/rescue.cpp"      //AI检测：救援区
#include "preprocess.cpp"             //图像预处理类
#include "recognition/crossroad.cpp" //十字道路识别与路径规划类
#include "recognition/ring.cpp"      //环岛道路识别与路径规划类
#include "recognition/tracking.cpp"  //赛道识别基础类
#include <signal.h>
#include <unistd.h>
#include <iostream>
#include <opencv2/highgui.hpp>
#include <opencv2/opencv.hpp>
#include <chrono>
#include <thread>
#include <mutex>
#include <condition_variable>

using namespace std;
using namespace cv;

Mat ai_image;
bool start_ai = false;
mutex mut;
condition_variable cond_var;
shared_ptr<Detection> detection_ptr;
void thread_ai() {
    while (true) {
        unique_lock<mutex> lock(mut);
        cond_var.wait(lock, [] { return start_ai; });
        if (ai_image.empty()) {
            continue; // 如果图像为空，则跳过此次循环
        }
        Mat image_copy = ai_image.clone();
        start_ai = false;
        lock.unlock();
        detection_ptr->inference(image_copy);
    }
}
int main(int argc, char const *argv[]) {
	Preprocess preprocess;    // 图像预处理类
     Display display(2);       // 初始化UI显示窗口
     VideoCapture capture;     // Opencv相机类
    //detection_ptr = make_shared<Detection>(); // 假设 Detection 类已经定义好
    detection_ptr = make_shared<Detection>("../res/model/yolov3_mobilenet_v1");   
    detection_ptr->score = 0.3; //看起来上面是输入模型地址的，从edgeboard当中输入
    thread ai_thread(thread_ai); // 启动子线程


    capture = VideoCapture("/dev/video0"); // 初始化相机串口，上面那个
  if (!capture.isOpened()) {
    printf("can not open video device!!!\n");
    return 0;
  }

    namedWindow("Live", WINDOW_AUTOSIZE);  // 创建显示窗口
    Mat frame;
    double fps = 0;
    int frame_count = 0;
    auto last_time = chrono::high_resolution_clock::now();

    while (true) {
        auto start_time = chrono::high_resolution_clock::now();  // 记录当前时间

        capture >> frame;  // 从摄像头捕获一帧
        if (frame.empty()) {
            cerr << "Warning: Empty frame" << endl;
            continue;
        }

        auto current_time = chrono::high_resolution_clock::now();
        chrono::duration<double> time_span = current_time - last_time;
        frame_count++;
        
        if (time_span.count() >= 1.0) {  // 每秒更新一次FPS
            fps = frame_count / time_span.count();  // 计算帧率
            frame_count = 0;
            last_time = current_time;
        }

        putText(frame, "FPS: " + to_string(fps), Point(20, 50), FONT_HERSHEY_SIMPLEX, 0.7, Scalar(255, 0, 0), 2);  // 显示FPS
        imshow("Live", frame);  // 显示当前帧

        if (waitKey(5) >= 0)
            break;  // 按任意键退出循环
    }

    return 0;
}
```



```plain
#include "../include/common.hpp"     //公共类方法文件
#include "../include/detection.hpp"  //百度Paddle框架移动端部署
#include "../include/uart.hpp"       //串口通信驱动
#include "controlcenter.cpp"         //控制中心计算类
#include "detection/bridge.cpp"      //AI检测：坡道区
#include "detection/danger.cpp"      //AI检测：危险区
#include "detection/parking.cpp"     //AI检测：停车区
#include "detection/racing.cpp"      //AI检测：追逐区
#include "detection/rescue.cpp"      //AI检测：救援区
#include "preprocess.cpp"             //图像预处理类
#include "recognition/crossroad.cpp" //十字道路识别与路径规划类
#include "recognition/ring.cpp"      //环岛道路识别与路径规划类
#include "recognition/tracking.cpp"  //赛道识别基础类
#include <signal.h>
#include <unistd.h>
#include <iostream>
#include <opencv2/highgui.hpp>
#include <opencv2/opencv.hpp>
#include <chrono>
#include <thread>
#include <mutex>
#include <condition_variable>

using namespace std;
using namespace cv;

Mat ai_image;
bool start_ai = false;
mutex mut;
condition_variable cond_var;
shared_ptr<Detection> detection_ptr;

void thread_ai() {
    int frame_count = 0;
    double fps = 0;
    auto last_time = chrono::high_resolution_clock::now();

    while (true) {
        unique_lock<mutex> lock(mut);
        cond_var.wait(lock, [] { return start_ai; });
        if (ai_image.empty()) {
            continue; // 如果图像为空，则跳过此次循环
        }
        Mat image_copy = ai_image.clone();
        start_ai = false;
        lock.unlock();

        auto start_time = chrono::high_resolution_clock::now(); // 开始推理计时
        detection_ptr->inference(image_copy);  // 进行模型推理
        auto end_time = chrono::high_resolution_clock::now();
        chrono::duration<double> time_span = end_time - start_time;
        
        frame_count++;
        if (time_span.count() >= 1.0) {  // 每秒更新一次FPS
            fps = frame_count / time_span.count();  // 计算帧率
            frame_count = 0;
            last_time = end_time;
            cout << "FPS: " << fps << endl;  // 输出FPS
        }
    }
}

int main(int argc, char const *argv[]) {
    detection_ptr = make_shared<Detection>("../res/model/yolov3_mobilenet_v1");   
    thread ai_thread(thread_ai); // 启动子线程

    VideoCapture capture("/dev/video0"); // 初始化相机
    if (!capture.isOpened()) {
        cerr << "Cannot open video device!" << endl;
        return -1;
    }

    Mat frame;
    while (true) {
        capture >> frame; // 从摄像头捕获一帧
        if (frame.empty()) {
            cerr << "Warning: Empty frame" << endl;
            continue;
        }

        {
            lock_guard<mutex> lock(mut); // 加锁以保护共享资源
            ai_image = frame.clone(); // 更新共享的图像
            start_ai = true; // 设置标志以启动 AI 推理
        }
        cond_var.notify_one(); // 通知子线程

        imshow("Live", frame); // 显示当前帧
        if (waitKey(5) >= 0)
            break; // 按任意键退出循环
    }

    ai_thread.join(); // 等待子线程结束
    return 0;
}

```

