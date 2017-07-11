#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/core/core.hpp"

#include <string>

using namespace cv;
using namespace std;

int main( int argc, char** argv )
{

  Mat GrayImg, Input_Frame;

  const string inputName = argv[1];                      // Where to get image
  const string outputName = argv[2];  // Where to put image 

  Input_Frame = imread(inputName);
  cvtColor(Input_Frame, GrayImg, CV_BGR2GRAY);  

  imwrite(outputName, GrayImg);

  return 0;
}
